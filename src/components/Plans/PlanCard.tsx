import getStripe from "@/configs/stripe";
import useSubscriptions from "@/hooks/useSubscriptions";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import PlanManageButton from "./PlanManageButton";

const PlanCard = ({
  plan,
  session,
  subscriptionPlan,
}: {
  plan: SubscriptionPlan;
  session: any;
  subscriptionPlan: any;
}) => {
  const buyPlan = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId: plan.id }),
    });
    const responseJson = await res.json();

    if (responseJson.session) {
      const stripe = await getStripe();
      stripe!.redirectToCheckout({
        sessionId: responseJson.session.id,
      });
    }
  };

  return (
    <div className="flex flex-col p-6 mx-auto w-full  text-center rounded-lg border shadow border-gray-600 bg-gray-800 text-white">
      <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400"></p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">$ {plan.price}</span>
        <span className="text-gray-500 dark:text-gray-400">/ One Time</span>
      </div>
      {/* <!-- List --> */}
      <ul role="list" className="mb-8 space-y-4 text-left">
        {plan.descriptionPoints.map((point, index) => (
          <li key={index} className="flex items-center space-x-3">
            {/* <!-- Icon --> */}
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <PlanManageButton
        userId={session.user.id}
        email={session.user.email || ""}
        stripePriceId={plan.stripePriceId}
        stripeCustomerId={subscriptionPlan?.stripeCustomerId}
        isSubscribed={!!subscriptionPlan.isSubscribed}
        isCurrentPlan={subscriptionPlan?.name === plan.name}
      />
    </div>
  );
};

export default PlanCard;
