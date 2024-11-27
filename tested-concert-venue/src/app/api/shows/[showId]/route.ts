import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getShowById } from "@/src/lib/features/shows/queries";

type Params = Promise<{ showId: string }>

const handler = async function (request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const showId = params.showId

  const show = await getShowById(Number(showId));
  return NextResponse.json({ show });
}

export { handler as GET };