import connectDB from "../../../libs/mongoConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "MongoDB connected successfully" }, { status: 200 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ error: "MongoDB connection failed", details: error.message }, { status: 500 });
  }
}
