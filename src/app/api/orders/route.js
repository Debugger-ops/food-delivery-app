import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongoConnect';
import Order from '@/models/Order';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const id = searchParams.get('id');

  try {
    if (id) {
      const order = await Order.findById(id);
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order.toObject()); // <-- ADD .toObject()
    } else if (email) {
      const orders = await Order.find({ userEmail: email }).sort({ _id: -1 });
      return NextResponse.json(orders);
    } else {
      return NextResponse.json({ error: 'Missing email or id' }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing order id' }, { status: 400 });
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
