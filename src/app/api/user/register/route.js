import User from "@/Model/user.model";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
connect();

export async function POST(req, res) {
  try {
    const { username, email, contactNo, password, confirmPassword } =
      await req.json();
      
        console.log(username, email, contactNo, password, confirmPassword)
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords doesn't match" },
        { status: 400 }
      );
    }
    

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 401 }
      );
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
        username:username,
        email:email.trim(),
        contactNo:contactNo,
        password: hashedPassword,
        confirmPassword: null,
      });
      await newUser.save();
      return NextResponse.json({newUser:newUser,message:"User Created Successfully"},{status:201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message:"Internal server Error"},{status:500})
  }
}
