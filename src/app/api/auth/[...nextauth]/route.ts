import clientPromise from "@/configs/mongodbClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import { options } from "./Options";

const handler = NextAuth(options);
// https://next-auth.js.org/configuration/providers

export { handler as GET, handler as POST };
