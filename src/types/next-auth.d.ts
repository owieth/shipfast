import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends DefaultUser {
    role: string;
    name: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      image?: string;
      email: string;
      name: string;
    } & DefaultSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
