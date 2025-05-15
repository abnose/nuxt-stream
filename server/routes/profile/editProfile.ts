import { defineEventHandler, getHeader, createError, H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import UserModel from '~/models/userModel'
import { z } from 'zod'
import { handleUpload } from '~/server/utils/uploadHelper'
import { parseFormData } from '~/server/utils/parseFormData'

const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
})

export default defineEventHandler(async (event: H3Event) => {
    // 🔐 Check auth header
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    // 🔑 Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId?: string }
    if (!decoded?.userId) throw createError({ statusCode: 401, statusMessage: 'Invalid token' })

    const userId = decoded.userId

    // 📩 Parse form
    const { fields, files } = await parseFormData(event)

    // Flatten fields for Zod
    const flatFields = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    )

    console.log(flatFields)

    // ✅ Validate inputs
    const result = schema.safeParse(flatFields)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation failed',
            data: {
                fieldErrors: result.error.flatten().fieldErrors,
            },
        })
    }

    const { username, title, description } = result.data

    // 🔍 Check if username is taken (by another user)
    const existingUser = await UserModel.findOne({ username, _id: { $ne: userId } })
    if (existingUser) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Username is already taken',
            data: {
                fieldErrors: { username: ['Username is already in use'] },
            },
        })
    }

    // 🧑‍💼 Find user
    const user = await UserModel.findById(userId)
    if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

    // 🖼️ Upload file (if image is present)
    const imageFile = files.image?.[0] || files.image
    const imagePath = imageFile
        ? await handleUpload(imageFile, '/uploads/profilePic', user.img)
        : user.img

    // ✏️ Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { username, title, description, img: imagePath },
        { new: true }
    )

    return {
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser,
    }
})
