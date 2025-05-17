import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    author: { type: String },
    content: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["Messages"]) {
  mongoose.deleteModel("Messages");
}

const MessageModel = mongoose.model("Messages", messageSchema);

export default MessageModel;
