// server/api/auth/logout.ts
import { defineEventHandler, createError } from 'h3'
import { tokenCheck } from '~/server/utils/tokenCheck'

export default defineEventHandler(async (event) => {
    tokenCheck(event)

    return {
        success: true,
        message: 'Logged out successfully',
    }
})
