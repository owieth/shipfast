"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const logout = async () => {
    try {
      const res = await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Button onClick={logout} className="w-full">
      Sign out
    </Button>
  );
};

export default SignOutButton;
