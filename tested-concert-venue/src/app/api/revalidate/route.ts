import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  if (process.env.APP_ENV !== "test") {
    return NextResponse.json({ message: "endpoint only available for test use" }, { status: 401 })    
  }

  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation token" }, { status: 401 })
  }

  // revalidate pages that can have ISR data updates
  // note: this will change to `res.revalidate` when
  //    revalidate-on-demand is out of beta
  await revalidatePath("/shows");
  await revalidatePath("/bands");

  return NextResponse.json({ ok: true });
}