// import { AuthUser, createJWT, hashPassword, passwordIsValid } from "../auth";
// import { AuthRequest } from "../middlewares";
import { getUsers } from "@/src/lib/features/users/queries";
import type { AuthUser } from "@/src/lib/features/users/types";
import {
  passwordIsValid,
  removePasswordandAddToken,
} from "@/src/lib/features/users/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // auth user
  const users = await getUsers();
  const validUser = users.reduce(
    (foundUser: AuthUser | null, user) =>
      user.email === email && passwordIsValid(password, user)
        ? user
        : foundUser,
    null
  );

  if (!validUser) return NextResponse.json({ message: "Invalid login" }, { status: 400 })

  // create jwt
  const user = removePasswordandAddToken(validUser);
  return NextResponse.json({ user });
}
