// src/app/api/login/route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/libs/mongoConnect';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Login successful
    return NextResponse.json({ message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
