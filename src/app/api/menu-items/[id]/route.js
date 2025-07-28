// src/app/api/menu-items/[id]/route.js

import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// ✅ GET a menu item by ID
export async function GET(req, context) {
  const { id } = context.params;

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const item = await MenuItem.findById(id);

    if (!item) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ✅ UPDATE a menu item by ID
export async function PUT(req, context) {
  const { id } = context.params;
  const data = await req.json();

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(id, data, { new: true });

    if (!updatedItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ✅ DELETE a menu item by ID
export async function DELETE(req, context) {
  const { id } = context.params;

  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Menu item deleted' });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
