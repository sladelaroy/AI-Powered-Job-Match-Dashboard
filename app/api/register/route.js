import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { isEmail, isLength} from "validator"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, password, skills } = await req.json();
    await connectDB()

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, message: "User already exists." });
    }

    if (!isLength(name, { min: 1 })) {
      throw new Error("Name is required and cannot be empty.");
    }
    if (!isEmail(email)) {
      throw new Error("Invalid email format.");
    }
    if (!isLength(password, { min: 6 })) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, skills });
    await newUser.save();



    return NextResponse.json({ success: true, message: "Sign up successful" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
