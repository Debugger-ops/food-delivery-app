import { NextResponse } from 'next/server';
import connectDB from '@/libs/mongoConnect';
import { Category } from '@/models/Category';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await connectDB();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
