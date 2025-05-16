import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcrypt'
import UserModel from '~/models/userModel'
import { z } from 'zod'
import { tokenCheck } from '~/server/utils/tokenCheck'

const schema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export default defineEventHandler(async (event) => {
    const userId = tokenCheck(event)
    const body = await readBody(event)

    const result = schema.safeParse(body)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Validation error',
            data: result.error.flatten().fieldErrors,
        })
    }

    const { currentPassword, newPassword } = result.data
    const user = await UserModel.findById(userId)
    if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) throw createError({ statusCode: 401, statusMessage: 'Current password is incorrect' })

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    return { success: true, message: 'Password changed successfully.' }
})
