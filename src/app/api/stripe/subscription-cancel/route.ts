import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { stripe } from "@/configs/stripe";
import { options } from "../../auth/[...nextauth]/Options";
import connectDB from "@/configs/dbConfig/dbConfig";
import Users from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    const session = await getServerSession(options);

    console.log("session from server", session);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    await connectDB();

    const foundUser = await Users.findOne({ email: session.user.email });

    const subscriptionId = foundUser.subscriptionId;

    const sessions = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
      metadata: {
        payingUserEmail: session.user.email,
      },
    });

    return NextResponse.json({ session: sessions }, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
