import jwt from "jsonwebtoken";
import type { ITokenPayload } from "@/lib/types";

export const decodeToken = (token?: string): ITokenPayload | null => {
  if (!token) return null;

  try {
    const payload = jwt.decode(token) as ITokenPayload | null;
    const isExpired = !payload || payload.exp * 1000 < Date.now();

    return isExpired ? null : payload;
  } catch {
    return null;
  }
};
