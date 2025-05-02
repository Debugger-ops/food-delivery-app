import { isAdmin } from "@/libs/isAdmin";
import { User } from "@/models/User";
import mongoose from "mongoose";

export async function GET(req) {
  await mongoose.connect(process.env.MONGODB_URL);

  const admin = await isAdmin(req); // ✅ Pass `req` here
  if (admin) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return new Response(JSON.stringify({ error: 'Not authorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
