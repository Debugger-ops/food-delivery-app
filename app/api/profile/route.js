import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectDB } from "@/libs/mongoConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const {
      fullName,
      email: userEmail,
      image,
      _id,
      admin,
      phone,
      address,
      postalCode,
      city,
      country
    } = user;

    return NextResponse.json({
      name: fullName,
      email: userEmail,
      image,
      _id,
      admin,
      phone,
      address,
      postalCode,
      city,
      country
    });

  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const email = session.user.email;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          fullName: body.name,
          address: body.address,
          city: body.city,
          postalCode: body.postalCode,
          country: body.country,
          phone: body.phone,
        },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });

  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
