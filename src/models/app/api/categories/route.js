import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongoConnect';
import { Category } from '@/models/Category';

// GET /api/categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (err) {
    console.error('Error in GET /api/categories:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/categories
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const newCategory = await Category.create({ name });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/categories:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
