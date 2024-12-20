import type { NextApiRequest, NextApiResponse } from "next";

import { validateToken } from "@/src/lib/auth/utils";
import { addReservation } from "@/src/lib/features/reservations/queries";
import { getShowById } from "@/src/lib/features/shows/queries";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ reservationId: string }>

const handler = async function (request: NextRequest, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const reservationId = params.reservationId;
  //const formData = await request.formData();
  const res = await request.json()
  
  const seatCount = res.seatCount;
  const userId = res.userId;
  const showId = res.showId;
  
  /*const tokenIsValid = await validateToken(req);
  if (!tokenIsValid) {
    return res.status(401).json({ message: "user not authenticated" });
  }*/
  const reservation = await addReservation({
    id: Number(reservationId),
    showId: Number(showId),
    userId: Number(userId),
    seatCount: Number(seatCount),
  });
  // get show info to return with reservation
  const show = await getShowById(reservation.showId);
  return NextResponse.json({ reservation: { ...reservation, show } });
}

export { handler as POST };