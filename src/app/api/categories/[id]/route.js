// src/app/api/categories/[id]/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongoConnect';
import { Category } from '@/models/Category';
import { isAdmin } from '@/libs/isAdmin';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const categoryData = await request.json();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    category.name = categoryData.name;
    category.description = categoryData.description || '';
    await category.save();

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Error editing category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
