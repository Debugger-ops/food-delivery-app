import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/libs/mongoConnect';

export async function POST(req) {
  try {
    const { email, password, fullName, phone = '', address = '' } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Email, password, and full name are required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      phone,
      address
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
