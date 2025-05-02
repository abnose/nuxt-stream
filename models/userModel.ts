import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        }
    },
    { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
    mongoose.deleteModel("users");
}

const UserModel = mongoose.model("users", userSchema);

export default UserModel;