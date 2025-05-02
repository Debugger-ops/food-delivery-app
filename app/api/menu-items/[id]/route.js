import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import  connectDB from '@/libs/mongoConnect';
import {MenuItem} from '@/models/MenuItem';

export async function DELETE(req) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Get ID from the dynamic route

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const item = await MenuItem.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });

  } catch (err) {
    console.error('DELETE ERROR:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
