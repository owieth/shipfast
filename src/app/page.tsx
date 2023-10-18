"use client";
import { getServerSession } from "next-auth";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-20">Landing page</h1>
      <Button>
        <Link href={"/login"}>Login</Link>
      </Button>
    </main>
  );
}
