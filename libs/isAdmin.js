import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/libs/mongoConnect";
import User from "@/models/User"; // or your actual model

export async function isAdmin() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return false;

  const user = await User.findOne({ email: session.user.email });

  return !!user?.admin;
}
