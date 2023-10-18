import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await getAuthSession();

  if (!session) return redirect("/login");
  console.log("navbar", session);

  return (
    <nav className="flex justify-between items-center py-2 px-4 sm:px-16 border-b">
      <h3 className="font-semibold text-lg tracking-tight">ShipFast</h3>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session.user?.image} alt={session.user.name} />
            <AvatarFallback>
              {session.user.name
                ?.split(" ")
                .map((word) => word[0].toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <span className="font-semibold">{session.user.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/subscription">
            <DropdownMenuItem className="cursor-pointer">
              Subscriptions
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
