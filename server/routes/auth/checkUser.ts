import { defineEventHandler } from 'h3'
import UserModel from '~/models/userModel'
import { tokenCheck } from '~/server/utils/tokenCheck'

export default defineEventHandler(async (event) => {
    const userId = tokenCheck(event)
    const user = await UserModel.findById(userId)

    return { user }
})
