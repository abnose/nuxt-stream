import { defineEventHandler, getRouterParam, createError } from "h3";
import ChannelModel from "~/models/channelModel";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Channel ID is required",
      });
    }

    // Populate owner field to get user info
    const channel = await ChannelModel.findById(id)
      .select("-__v")
      .populate("owner", "username"); // only get username of owner

    if (!channel) {
      throw createError({
        statusCode: 404,
        statusMessage: "Channel not found",
      });
    }

    return {
      success: true,
      channel: {
        id: channel._id,
        username: channel.owner?.username || null,
        title: channel.title,
        description: channel.description,
        avatarUrl: channel.avatarUrl,
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
