import { QueryError } from "@components/_common/QueryError";
import { getBandById, getBands } from "@/src/lib/features/bands/queries";
import BandPage from "./bandPage";
import { use } from "react";
// SSG reference:
// https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data

async function getBand({
  bandId,
}: {
  bandId: string;
}) {  
  let band = null;
  let error = null;
  try {
    // for SSG, talk directly to db (no need to go through API)
    band = await getBandById(Number(bandId));
  } catch (e) {
    if (e instanceof Error) error = e.message;
    if (e && typeof e === "object" && "toString" in e) error = e.toString();
  }
  return { band, error };
}

// https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#replacing-fallback
export const dynamicParams = true;

export async function generateStaticParams() {
  const bands = await getBands();

  const paths = bands.map((band) => ({
    bandId: band.id.toString()
  }));

  return paths;
}

type Params = Promise<{ bandId: string }>

export default function Page(props: {
  params: Params    
}): React.ReactElement {
  const params = use(props.params)
  const response = use(getBand(params))  

  return <BandPage band={response.band} error={response.error} />
}
