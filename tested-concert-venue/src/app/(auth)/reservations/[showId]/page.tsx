//import { useParams } from "next/navigation";
import React, { use } from "react";

import { Reservation } from "@/src/components/reservations/Reservation";

type Params = Promise<{ showId: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function Reservations(props: {
  params: Params
  searchParams: SearchParams  
}) {
  //const params = useParams<{ showId: string; }>()
  const params = use(props.params)
  const searchParams = use(props.searchParams) 
  console.log({params})
  const showId = params.showId;
  //const { showId } = slug;  

  if (!showId) return null;
  return (
    <Reservation showId={Number(showId)} />
  );
}

Reservations.auth = true;
