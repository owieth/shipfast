import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSubscriptions from "@/hooks/useSubscriptions";
import { getAuthSession } from "@/lib/auth";
import { storeSubscriptionPlans } from "@/configs/stripe";
import PlanCard from "@/components/Plans/PlanCard";
import { Card } from "@/components/ui/card";
const Page = async () => {
  const subscriptionPlan = await useSubscriptions();
  const session = await getAuthSession();
  return (
    <div className="flex h-full w-full flex-col  items-center justify-center p-24">
      <Card className="p-6 mb-2">
        <p className="text-lg font-semibold leading-none">
          {subscriptionPlan.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {!subscriptionPlan.isSubscribed
            ? "You are not subscribed to any plan."
            : subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          {subscriptionPlan?.stripeCurrentPeriodEnd
            ? new Date(
                subscriptionPlan.stripeCurrentPeriodEnd
              ).toLocaleDateString()
            : null}
        </p>
      </Card>
      <div className="flex w-full  gap-3">
        {storeSubscriptionPlans.map((plan) => (
          <PlanCard
            subscriptionPlan={subscriptionPlan}
            session={session}
            key={plan.id}
            plan={plan}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
