"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const [isLoading, setisLoading] = React.useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm();

  const [buttonEnabled, setButtonEnabled] = React.useState(false);

  const onSignup = async () => {
    try {
      console.log("onSignup");

      const data = {
        name: watch("fullName"),
        email: watch("Email"),
        password: watch("Password"),
      };

      console.log(data);

      if (!watch("Password") || !watch("Email") || !watch("fullName")) {
        toast.error("Please fill all the fields");
        return;
      }

      setisLoading(true);

      const res = await axios.post("/api/user/signup", data);

      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/login");
      } else {
        console.log(res.data.message);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error || error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (watch("username") && watch("Email") && watch("Password")) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [watch("username"), watch("Email"), watch("Password")]);

  return (
    <div className="flex min-h-screen  flex-col gap-4  items-center justify-center  ">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="flex form-control w-full max-w-xs flex-col gap-2">
        <label className="label">Full name</label>
        <Input
          {...register("fullName", { required: true })}
          placeholder="Full name"
          className="input input-bordered w-full max-w-xs"
        />
        {errors.fullName && <p className="error">Full name is required.</p>}
        <label className="label">Email</label>
        <Input
          {...register("Email", { required: true })}
          className="input input-bordered w-full max-w-xs"
          placeholder="Email"
        />
        {errors.Email && <p className="error">Email is required.</p>}
        <label className="label">Password</label>
        <Input
          {...register("Password", { required: true })}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSignup)();
            }
          }}
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        {errors.Password && <p className="error">Password is required.</p>}

        <Button
          className={` ${buttonEnabled ? "btn" : "btn btn-disabled"} mt-4`}
          onClick={onSignup}
          type="submit"
        >
          {/* {isLoading && (
            <span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></span>
          )} */}
          Signup
        </Button>

        <div className="mt-4 items-center justify-between flex w-full">
          <p>
            Already have an account ?{" "}
            <Link href={"/login"} className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
