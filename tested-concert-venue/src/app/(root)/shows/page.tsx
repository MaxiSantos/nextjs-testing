import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import { LoadingSpinner } from "@components/_common/LoadingSpinner";
import { BandLinkHeading } from "@components/bands/BandLinkHeading";
import { axiosInstance } from "@src/lib/axios/axiosInstance";
import { routes } from "@src/lib/axios/routes";
import { getShows as getShowsViaDbQuery } from "@src/lib/features/shows/queries";
import type { Show } from "@src/lib/features/shows/types";
import { formatDate } from "@src/lib/features/shows/utils";
import Link from "next/link";
import ShowsList from "./showsList";

const THIRTY_SECONDS = 30 * 1000;

const getShowsViaAPI = async () => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}`);
  return data.shows;
};

// ISR reference
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

// SWR + ISR reference:
// https://www.smashingmagazine.com/2021/09/useswr-react-hook-library-incremental-static-regeneration-nextjs/

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
