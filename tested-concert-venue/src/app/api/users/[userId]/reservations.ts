import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/src/lib/api/handler";
import { getReservationsByUserId } from "@/src/lib/features/users/queries";

const handler = createHandler({ authRequired: true });
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const userReservations = await getReservationsByUserId(Number(userId));
  return res.status(200).json({ userReservations });
});

export default handler;
