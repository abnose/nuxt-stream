import jwt from 'jsonwebtoken'
import { getHeader, createError, H3Event } from 'h3'

export const tokenCheck = (event: H3Event): string => {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        throw createError({ statusCode: 401, statusMessage: 'Authorization token missing or invalid' })
    }

    const token = authHeader.replace('Bearer ', '').trim()

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: string }
        if (!decoded?.userId) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid token payload' })
        }

        return decoded.userId
    } catch (err) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }
}