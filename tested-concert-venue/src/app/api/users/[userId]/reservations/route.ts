import { NextRequest, NextResponse } from "next/server";
import { getReservationsByUserId } from "@/src/lib/features/users/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const userReservations = await getReservationsByUserId(Number(userId));
  return NextResponse.json({ userReservations });
}
