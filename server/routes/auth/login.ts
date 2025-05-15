import jwt from 'jsonwebtoken'
import UserModel from '~/models/userModel'
import { LoginSchema } from '~/validation/userValidation'
import bcrypt from 'bcrypt'
import { IUser } from '~/interfaces'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const result: any = LoginSchema.safeParse(body)

    // Validate input
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request',
            data: result.error.flatten(),
        })
    }

    const { usernameOrEmail, password } = result.data

    // Find user by email or username
    const user = await UserModel.findOne({
        $or: [
            { email: usernameOrEmail },
            { username: usernameOrEmail }
        ]
    })

    // Check if user exists
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid email or username',
        })
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid password',
        })
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '8h',
    })

    // Return response
    return {
        statusCode: 200,
        message: 'Login successful',
        data: {
            token,
            email: user.email || '',
            username: user.username,
            id: user._id,
            img: user.img,
        },
    }
})