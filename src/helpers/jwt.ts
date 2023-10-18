import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export const generateJWT = (payload: any, expiresIn: string = "5h"): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: expiresIn,
  });
};

export const verifyJWT = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || "");
};

type DecodedToken = {
  id: string;
  username: string;
  email: string;
};

export const getInformationFromJWT = (request: NextRequest): any => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: DecodedToken = verifyJWT(token);
    return decodedToken.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
