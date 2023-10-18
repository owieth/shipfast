import connectDB from "@/configs/dbConfig/dbConfig";
import Users from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const token = reqbody.token;

    const user = await Users.findOne({
      varificationToken: token,
      varificationTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Expired token",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }

    user.isVarified = true;
    user.varificationToken = undefined;
    user.varificationTokenExpire = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified",
        success: true,
      },
      {
        status: StatusCodes.OK,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        body: {
          success: false,
          message: "Server error",
        },
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }

  // Expire
}
