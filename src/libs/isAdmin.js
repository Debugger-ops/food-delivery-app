import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/libs/mongoConnect";
import User from "@/models/User";

export async function isAdmin(req) {
  await connectDB();

  const session = await getServerSession(req, authOptions); // ✅ pass req

  if (!session?.user?.email) return false;

  const user = await User.findOne({ email: session.user.email });

  return !!user?.admin;
}
