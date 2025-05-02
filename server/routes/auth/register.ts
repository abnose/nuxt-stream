import jwt from 'jsonwebtoken'
import UserModel from '~/models/userModel'
import { RegisterSchema } from '~/validation/userValidation'
import bcrypt from 'bcrypt'
import { IUser } from '~/interfaces'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const result: any = RegisterSchema.safeParse(body)
    const { email, password, username } = result.data

    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request',
            data: result.error.flatten(),
        })
    }
    let existingUser = null
    if (email) {
        existingUser = await UserModel.findOne({
            $or: [{ email }, { username }],
        })
    } else {
        existingUser = await UserModel.findOne({
            username,
        })
    }

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email or username already exists',
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user: any = UserModel.create({
        username,
        email,
        password: hashedPassword,
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '8h',
    })

    return {
        statusCode: 200,
        message: 'Register successful',
        data: {
            token,
            email: user?.email || '',
            username: user.username,
            id: user._id,
        },
    }
})
