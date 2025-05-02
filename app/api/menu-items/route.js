import mongoose from 'mongoose';
import { MenuItem } from '@/models/MenuItem';
import { isAdmin } from '@/libs/isAdmin';

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();

    if (!data || !data.category || !mongoose.Types.ObjectId.isValid(data.category)) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing category.' }),
        { status: 400 }
      );
    }

    if (await isAdmin()) {
      const menuItemDoc = await MenuItem.create(data);
      return Response.json(menuItemDoc);
    } else {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
    }
  } catch (error) {
    console.error('POST /api/menu-items error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const { _id, ...data } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    if (await isAdmin()) {
      await MenuItem.findByIdAndUpdate(_id, data);
      return Response.json(true);
    } else {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const items = await MenuItem.find();
    return Response.json(items);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    if (await isAdmin()) {
      await MenuItem.deleteOne({ _id });
      return Response.json(true);
    } else {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
