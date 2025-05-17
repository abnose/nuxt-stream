import { defineEventHandler, createError, H3Event } from "h3";
import UserModel from "~/models/userModel";
import ChannelModel from "~/models/channelModel";
import { z } from "zod";
import { handleUpload } from "~/server/utils/uploadHelper";
import { parseFormData } from "~/server/utils/parseFormData";
import { tokenCheck } from "~/server/utils/tokenCheck";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export default defineEventHandler(async (event: H3Event) => {
  const userId = tokenCheck(event);

  // 📩 Parse form data
  const { fields, files } = await parseFormData(event);

  // Flatten fields for Zod validation
  const flatFields = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  );

  // ✅ Validate inputs
  const result = schema.safeParse(flatFields);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: {
        fieldErrors: result.error.flatten().fieldErrors,
      },
    });
  }

  const { username, title, description } = result.data;

  // 🔍 Check if username is taken (by another user)
  const existingUsername = await UserModel.findOne({
    username,
    _id: { $ne: userId },
  });
  if (existingUsername) {
    throw createError({
      statusCode: 409,
      statusMessage: "Username is already taken",
      data: {
        fieldErrors: { username: ["Username is already in use"] },
      },
    });
  }

  // 🧑‍💼 Find the user
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }

  // 📺 Ensure the user has a channel
  if (!user.channel) {
    throw createError({
      statusCode: 400,
      statusMessage: "User has no associated channel",
    });
  }

  // 🖼️ Upload profile image if provided
  const imageFile = files.image?.[0] || files.image;
  const imagePath = imageFile
    ? await handleUpload(imageFile, "/uploads/profilePic", user.img)
    : user.img;

  // 📝 Update user if username or image changed
  if (user.username !== username || user.img !== imagePath) {
    await UserModel.updateOne({ _id: userId }, { username, img: imagePath });
  }

  // 🛠️ Update the associated channel
  const updatedChannel = await ChannelModel.findByIdAndUpdate(
    user.channel,
    {
      username,
      title,
      description,
      avatarUrl: imagePath,
    },
    { new: true }
  );

  // 🔄 Fetch the updated user
  const updatedUser = await UserModel.findById(userId);

  return {
    success: true,
    message: "Channel updated successfully",
    user: {
      id: updatedUser._id,
      username: updatedUser.username,
      img: updatedUser.img,
    },
    channel: {
      id: updatedChannel._id,
      username: updatedChannel.username,
      title: updatedChannel.title,
      description: updatedChannel.description,
      avatarUrl: updatedChannel.avatarUrl,
    },
  };
});
