import { connect } from "@/dbConfig/dbConfig";
import User from "@/Model/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
connect();

export async function POST(req, res) {

  let userDetail;
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "Email or password is Invalid" },
        { status: 201 }
      );
    }
    const matchedPassword = await bcryptjs.compare(password, user.password);

    if (!matchedPassword) {
      return NextResponse.json(
        { message: "Password Invalid" },
        { status: 201 }
      );
    }
    if (matchedPassword) {
      userDetail = await User.findOne({ email: email }, { __v: 0 }).select(
        "-password -confirmPassword -createdAt -updatedAt"
      );
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
    );

    const response = NextResponse.json(
      userDetail,
      { message: "User Logged In Successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 ,
      path: "/",
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
