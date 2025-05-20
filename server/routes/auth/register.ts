import jwt from "jsonwebtoken";
import UserModel from "~/models/userModel";
import { RegisterSchema } from "~/validation/userValidation";
import bcrypt from "bcrypt";
import { IUser } from "~/interfaces";
import ChannelModel from "~/models/channelModel";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result: any = RegisterSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request",
      data: result.error.flatten(),
    });
  }

  const { email, password, username } = result.data;

  // Check for existing user
  const existingUser = await UserModel.findOne(
    email ? { $or: [{ email }, { username }] } : { username }
  );

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email or username already exists",
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user first
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  // Create a channel and link the owner to this user
  const newChannel = await ChannelModel.create({
    owner: user._id,
  });

  // Update the user with the channel reference
  user.channel = newChannel._id;
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  return {
    statusCode: 200,
    message: "Register successful",
    data: {
      token,
      email: user.email || "",
      username: user.username,
      id: user._id,
    },
  };
});
