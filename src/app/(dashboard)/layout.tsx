import "src/app/globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { cn } from "@/lib/utils";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "users dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("dark w-screen", inter.className)}>
        <Navbar />
        <main className="h-[calc(100vh-57px)] ">{children}</main>
      </body>
    </html>
  );
}
