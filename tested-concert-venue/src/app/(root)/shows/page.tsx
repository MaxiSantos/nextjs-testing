import React from "react";
import { getShows as getShowsViaDbQuery } from "@src/lib/features/shows/queries";
import ShowsList from "./showsList";

export async function _getShows() {
  // can't use getShows here because getStaticProps runs while building;
  // Server isn't running while building!
  const isrShows = await getShowsViaDbQuery();

  return JSON.stringify(isrShows)  
}

export default async function Shows(): Promise<React.ReactElement> {
  const isrShows = JSON.parse(await _getShows());
  return <ShowsList isrShows={isrShows}/>
}
