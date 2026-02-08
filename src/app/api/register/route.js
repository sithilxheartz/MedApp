import { NextResponse } from "next/server";
import User from "../../../models/User";      // <--- Changed to relative path
import connectDB from "../../../lib/db";  // <--- Changed to relative path
import bcrypt from "bcryptjs";

// ... keep the rest of your code ...
// ... keep the rest of your code ...

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (Role defaults to 'customer' via Schema)
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}