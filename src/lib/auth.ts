import { options } from "@/app/api/auth/[...nextauth]/Options";
import { getServerSession } from "next-auth";

export const getAuthSession = async () => {
  return getServerSession(options);
};
