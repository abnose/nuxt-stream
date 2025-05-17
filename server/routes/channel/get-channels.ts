import { defineEventHandler, createError } from "h3";
import ChannelModel from "~/models/channelModel";

export default defineEventHandler(async () => {
  try {
    const channels = await ChannelModel.find().select("-__v"); // exclude internal field __v

    return {
      success: true,
      channels: channels.map((channel) => ({
        id: channel._id,
        username: channel.username,
        title: channel.title,
        description: channel.description,
        avatarUrl: channel.avatarUrl,
        // Add other fields you want to expose
      })),
    };
  } catch (error) {
    console.error("Error fetching channels:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch channels",
    });
  }
});
