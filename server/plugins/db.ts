import connectDB from "~/server/middleware/db";


export default async (context: any) => {
    await connectDB();
};