import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

// GET all menu items
export async function GET() {
  await connectDB();
  const items = await MenuItem.find();
  return Response.json(items);
}

// POST new menu item
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const created = await MenuItem.create(data);
  return Response.json(created);
}
