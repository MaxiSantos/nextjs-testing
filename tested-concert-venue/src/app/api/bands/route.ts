import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { addBand } from "@/src/lib/features/bands/queries";

export async function POST(request: NextRequest) {
  // an endpoint to demonstrate on-demand ISR revalidation
  //   https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
  // in an actual app, this would have a UI, and it would need authorization
  //   to check the user is authorized to make changes to bands
  // in this app, this endpoint will be hit by testing directly to test on-demand ISR revalidation

  // Check for secret to confirm this is a valid request
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation token" }, { status: 500 })
  }

  // add band (here is where authorization would be validated)
  //const { newBand } = req.body;
  const res = await request.json()
  const addedBand = await addBand(res.newBand);

  // revalidate bands page for ISR
  // note: this will change to `res.revalidate` when
  // this feature is out of beta
  await revalidatePath("/bands");
  return NextResponse.json({ band: addedBand, revalidated: true });
}
