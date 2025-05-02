import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const { Schema } = mongoose;

const defaultTitle = "New Channel";
const defaultDescription = "This is new channel description";


const channelSchema = new mongoose.Schema(
    {
        isActive: { type: Boolean, default: false },
        title: { type: String, default: defaultTitle },
        description: { type: String, default: defaultDescription },
        avatarUrl: { type: String, default: "none" },
        streamKey: { type: String, default: uuid() },
        messages: {
            type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
            default: [],
        },
    },
    { timestamps: true }
);

if (mongoose.models && mongoose.models["Channels"]) {
    mongoose.deleteModel("Channels");
}

const UserModel = mongoose.model("Channels", channelSchema);

export default UserModel;