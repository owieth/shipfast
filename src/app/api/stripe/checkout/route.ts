import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { stripe } from "@/configs/stripe";
import { options } from "../../auth/[...nextauth]/Options";
import connectDB from "@/configs/dbConfig/dbConfig";
import Users from "@/models/user";
import useSubscriptions from "@/hooks/useSubscriptions";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    const session = await getServerSession(options);

    // console.log("session from server", session);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const foundUser = await Users.findOne({ email: session.user.email });

    const sessions = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: foundUser.email,
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
      subscription_data: {
        metadata: {
          payingUserEmail: session.user.email,
        },
        trial_period_days: 14,
      },
    });

    if (!sessions.url)
      return NextResponse.json(
        { error: "Could not create checkout session" },
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
