import connectDB from "@/configs/dbConfig/dbConfig";
import { storeSubscriptionPlans, stripe } from "@/configs/stripe";
import { getAuthSession } from "@/lib/auth";
import Users from "@/models/user";

import React from "react";

const useSubscriptions = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    throw new Error("User not found.");
  }

  await connectDB();

  const foundUser = await Users.findOne({ email: session.user.email });

  if (!foundUser) {
    throw new Error("User not found.");
  }

  const isSubscribed =
    foundUser.stripePriceId &&
    foundUser.stripeCurrentPeriodEnd &&
    new Date(foundUser.stripeCurrentPeriodEnd).getTime() + 86_400_000 >
      Date.now();

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        (plan) => plan.stripePriceId === foundUser.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && foundUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      foundUser.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: foundUser.stripeSubscriptionId,
    stripeCurrentPeriodEnd: foundUser.stripeCurrentPeriodEnd,
    stripeCustomerId: foundUser.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
};

export default useSubscriptions;
