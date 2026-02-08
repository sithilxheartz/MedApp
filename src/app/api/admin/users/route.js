import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // To check who is asking
import User from "@/models/User";
import connectDB from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // We need to export authOptions from your auth file first!

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  // SECURITY CHECK: Is the user logged in AND an admin?
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
  }

  // If yes, return all users but hide their passwords
  const users = await User.find({}, "-password"); 
  return NextResponse.json(users);
}