import connectDB from "@/configs/dbConfig/dbConfig";
import Users from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { sendMail } from "@/helpers/mailer";
import { EMAIL_TYPE } from "@/constants/email";
// import { createStripeCustomer } from "@/configs/stripe";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }

    await connectDB();

    const user = await Users.findOne({ email });

    console.log("user found", user);

    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await Users.create({
      name,
      email,
      provider: "credentials",
      password: hashedPassword,
    });

    console.log("createdUser", createdUser);

    // await sendMail(email, createdUser._id, EMAIL_TYPE.VERIFY);
    return NextResponse.json(
      {
        message: "Account created successfully",
        success: true,
        user: {
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
        },
      },
      {
        status: StatusCodes.CREATED,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
