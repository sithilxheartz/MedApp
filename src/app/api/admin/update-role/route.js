import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";   // <--- Relative path
import connectDB from "../../../../lib/db";  // <--- Relative path
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Keep this one as @ if it works, or change to relative if it fails later.

export async function PUT(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  // 1. Security Check
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
  }

  // 2. Get data from the frontend
  const { id, newRole } = await req.json();

  // 3. Update the user
  await User.findByIdAndUpdate(id, { role: newRole });

  return NextResponse.json({ message: "Role updated" });
}