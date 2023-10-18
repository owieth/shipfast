"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import Image from "next/image";
import googleIcon from "../../../../public/icons/google.png";

const Page = () => {
  const [isLoading, setisLoading] = React.useState(false);
  const [isGoogleLoading, setisGoogleLoading] = React.useState(false);
  const router = useRouter();

  const { data } = useSession();

  if (data?.user) {
    router.push("/profile");
  }

  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm();

  const [buttonEnabled, setButtonEnabled] = React.useState(false);

  const onLogin = async () => {
    try {
      console.log("onLogin");

      setisLoading(true);

      const data = {
        email: watch("Email"),
        password: watch("Password"),
      };

      const res = await signIn("credentials", {
        redirect: true,
        callbackUrl: "http://localhost:3000/profile",
        ...data,
      });

      // const res = await axios.post("/api/user/login", data);
      console.log("ee", res);
      if (res?.error) {
        toast.error(res.error);
      } else {
        // toast.success("Login Success");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setisLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      setisGoogleLoading(true);
      const res = await signIn("google", {
        redirect: true,
        callbackUrl: "http://localhost:3000/profile",
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Login Success");
        router.replace("/profile");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setisGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (watch("Email") && watch("Password")) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("username"), watch("Email"), watch("Password")]);

  return (
    <div className="flex min-h-screen   flex-col gap-4  items-center justify-center  ">
      <div className="flex flex-col  p-10  gap-2">
        <label className="label">Email</label>
        <Input
          {...register("Email", { required: true })}
          className="input input-bordered w-full max-w-xs"
          placeholder="Email"
        />
        {errors.Email && <p className="error">Email is required.</p>}
        <label className="label">Password</label>
        <Input
          type="password"
          {...register("Password", { required: true })}
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        {errors.Password && <p className="error">Password is required.</p>}

        <Button className={`  mt-3 flex gap-3 `} onClick={onLogin}>
          {isLoading && <span className="loading loading-spinner"></span>}
          Login
        </Button>
        <p className="w-full text-center">Or</p>
        <div className="w-full items-center justify-center ">
          <Button onClick={onGoogleLogin} className="w-full flex gap-3">
            <Image width={25} height={25} src={googleIcon} alt="googleicon" />
            Continue with google
          </Button>
        </div>

        <div className="mt-4 items-center justify-between flex w-full">
          <p>
            Dont have any account ?{" "}
            <Link href={"/signup"} className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
