'use client'

import {
  Box,
  Button,
  Heading,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@components/_common/LoadingSpinner";
import { BandLinkHeading } from "@components/bands/BandLinkHeading";
import { axiosInstance } from "@src/lib/axios/axiosInstance";
import { routes } from "@src/lib/axios/routes";
import type { Show } from "@src/lib/features/shows/types";
import { formatDate } from "@src/lib/features/shows/utils";

const THIRTY_SECONDS = 30 * 1000;

// ISR reference
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

// SWR + ISR reference:
// https://www.smashingmagazine.com/2021/09/useswr-react-hook-library-incremental-static-regeneration-nextjs/

const getShowsViaAPI = async () => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}`);
  return data.shows;
};

export default function ShowsList({
  isrShows,
}: {
  isrShows: Array<Show>;
}): React.ReactElement {
  const router = useRouter();
  const { data: shows, isValidating } = useSWR<Array<Show>>(
    "/api/shows",
    getShowsViaAPI,
    {
      fallbackData: isrShows,
      refreshInterval: THIRTY_SECONDS,
    }
  );

  return (
    <Stack align="center" spacing={10}>
      <LoadingSpinner display={isValidating && !shows} />
      <Heading mt={10}>Upcoming Shows</Heading>
      <List.Root width="100%" alignContent="center" pb={10}>
        {shows?.map((show) => (
          <List.Item
            key={show.id}
            width="100%"
            display="flex"
            mb={10}
            alignItems="center"
          >
            <Box mr={5} width="30%" textAlign="right">
              {formatDate(show.scheduledAt)}
            </Box>
            <Box width="10%" textAlign="center">
              {show.availableSeatCount <= 0 ? (
                <Heading size="md" color="red.500">
                  sold out
                </Heading>
              ) : (
                <Button onClick={() => router.push(`/reservations/${show.id}`)}>
                  tickets
                </Button>                            
              )}
            </Box>
            <Box>
              <BandLinkHeading band={show.band} />
              <Text fontStyle="italic" color="gray.400" fontFamily="Lato">
                {show.band.description}
              </Text>
            </Box>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  );
}
