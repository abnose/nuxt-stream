import { defineEventHandler, getRouterParam, createError } from "h3";
import UserModel from "~/models/userModel";
import { tokenCheck } from "~/server/utils/tokenCheck";

export default defineEventHandler(async (event) => {
    const userId = tokenCheck(event);
    const channelId = getRouterParam(event, "id");

    if (!channelId) {
        throw createError({ statusCode: 400, statusMessage: "Channel ID required" });
    }

    await UserModel.findByIdAndUpdate(userId, {
        $pull: { followedChannels: channelId },
    });

    return { success: true };
});
