"use client";
import React from "react";
import { Button } from "../ui/button";
import getStripe from "@/configs/stripe";
interface ManageUserSubscriptionButtonProps {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
}
const PlanManageButton = ({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
}: ManageUserSubscriptionButtonProps) => {
  const onManageSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/billingsession", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await res.json();

      if (responseJson.session.url) {
        window.location.assign(responseJson.session.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubscribe = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId: stripePriceId }),
      });
      const responseJson = await res.json();

      if (responseJson.session) {
        const stripe = await getStripe();
        stripe!.redirectToCheckout({
          sessionId: responseJson.session.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={isCurrentPlan ? onManageSubscription : onSubscribe}>
      {isCurrentPlan ? "Manage Subscription" : "Subscribe"}{" "}
    </Button>
  );
};

export default PlanManageButton;
