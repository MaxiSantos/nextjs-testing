import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { generateData } from "@/src/lib/db/data/generateData";
import { addShow, getShows } from "@/src/lib/features/shows/queries";

export async function GET(request: NextRequest) {
  let shows = await getShows();
  // generate shows if there aren't any
  if (shows.length === 0) {
    await generateData();
    shows = await getShows();
  }
  return NextResponse.json({ shows });
}

export async function POST(request: NextRequest) {
  // an endpoint to demonstrate on-demand ISR revalidation
  //   https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
  // in an actual app, this would have a UI, and it would need authorization
  //   to check the user is authorized to make changes to shows
  // in this app, this endpoint will be hit by testing directly to test on-demand ISR revalidation

  // Check for secret to confirm this is a valid request
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 })
  }

  // add show (here is where authorization would be validated)
  const res = await request.json()
  console.log({body: res.body})
  //const newShow = formData.get("newShow") as any;
  const addedShow = await addShow(res.newShow);
  //const addedShow = true;

  // revalidate shows page for ISR
  // note: this will change to `res.revalidate` when
  // this feature is out of beta
  await revalidatePath("/shows");
  return NextResponse.json({ show: addedShow, revalidated: true });
}