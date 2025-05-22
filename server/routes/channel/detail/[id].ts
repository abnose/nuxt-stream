import { defineEventHandler, getRouterParam, createError } from "h3";
import ChannelModel from "~/models/channelModel";
import UserModel from "~/models/userModel";
import { tokenCheck } from "~/server/utils/tokenCheck";

export default defineEventHandler(async (event) => {
  try {
    let userId = null;

    // Optional: Extract token if available
    try {
      userId = tokenCheck(event);
    } catch (err) {
      console.log(err)
      userId = null;
    }

    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Channel ID is required",
      });
    }

    const channel = await ChannelModel.findById(id)
      .select("-__v")
      .populate("owner", "username");

    if (!channel) {
      throw createError({
        statusCode: 404,
        statusMessage: "Channel not found",
      });
    }

    let isFollowed = false;
    console.log(userId, 'dalala')
    if (userId) {
      const user = await UserModel.findById(userId).select("followedChannels");
      isFollowed = user?.followedChannels?.some(
        (chId) => {
          console.log(chId)
          console.log(id)
          return chId.toString() == id
        }
      );
    }

    return {
      success: true,
      channel: {
        id: channel._id,
        username: channel.owner?.username || null,
        title: channel.title,
        description: channel.description,
        avatarUrl: channel.avatarUrl,
        isOnline: channel.isOnline || false,
        isFollowed,
      },
    };
  } catch (error) {
    console.error("Error fetching channel by ID:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch channel details",
    });
  }
});
