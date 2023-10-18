import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { stripe } from "@/configs/stripe";
import { options } from "../../auth/[...nextauth]/Options";
import connectDB from "@/configs/dbConfig/dbConfig";
import Users from "@/models/user";
import useSubscriptions from "@/hooks/useSubscriptions";

export async function GET(request: NextRequest) {
  try {
    // const { planId } = await request.json();

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

    const sessions = await stripe.billingPortal.sessions.create({
      customer: foundUser.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
    });

    if (!sessions)
      return NextResponse.json(
        { error: "Could not create billing session" },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );

    return NextResponse.json({ session: sessions }, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
