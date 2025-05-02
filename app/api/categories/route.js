import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongoConnect';
import { Category } from '@/models/Category';  // Named import
import { isAdmin } from '@/libs/isAdmin';

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

export async function POST(req) {
  if (!(await isAdmin(req))) {
    console.log('Not authorized');
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  try {
    const categoryData = await req.json();
    const newCategory = await Category.create(categoryData);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    console.error('Error creating category:', err);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
