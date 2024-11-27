'use client'
/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import { LoadingSpinner } from "@components/_common/LoadingSpinner";
import { QueryError } from "@components/_common/QueryError";
import { axiosInstance } from "@/src/lib/axios/axiosInstance";
import { routes } from "@/src/lib/axios/routes";
import { generateRandomId } from "@/src/lib/features/reservations/utils";
import type { Show } from "@/src/lib/features/shows/types";
import { formatDate } from "@/src/lib/features/shows/utils";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";
import { useRouter } from "next/navigation";

const DEFAULT_TICKET_COUNT = 2;
const FIFTEEN_SECONDS = 15 * 1000;

const getShowsViaAPI = async (showId: number) => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}/${showId}`);
  return data.show;
};

interface ReservationProps {
  showId: number;  
}

export const Reservation = ({ showId }: ReservationProps) => {
  const [reservedSeatCount, setReservedSeatCount] =
    React.useState(DEFAULT_TICKET_COUNT);
  const router = useRouter();
  const reservationId = generateRandomId();
  const submitPurchase = ({
    reservationId,
    reservedSeatCount,
  }: {
    reservationId: number;
    reservedSeatCount: number;
  }) => {
    router.push(
      `/confirmation/${reservationId}?seatCount=${reservedSeatCount}&showId=${showId}`
    );
  };

  const onSubmit = () => submitPurchase({ reservationId, reservedSeatCount });

  const {
    data: show,
    error,
    isValidating,
  } = useSWR<Show>(
    showId || showId === 0 ? `/api/show/${showId}` : null,
    () => getShowsViaAPI(showId),
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      refreshInterval: FIFTEEN_SECONDS,
    }
  );

  if (error) return <QueryError message="Could not retrieve show info" />;

  return (
    <Stack align="center" spacing={10}>
      <LoadingSpinner display={isValidating && !show} />
      {show ? (
        <VStack spacing={2}>
          <Heading mt={10} size="md">
            Reserve your seats for
          </Heading>
          <Heading>{show.band.name}</Heading>
          <Text size="lg">{formatDate(show.scheduledAt)}</Text>
          {show.availableSeatCount === 0 ? (
            <Heading color="red.500">Show is sold out!</Heading>
          ) : (
            <>
              <Heading
                size="md"
                color={show.availableSeatCount < 10 ? "red.500" : "inherit"}
              >
                {show.availableSeatCount} seats left
              </Heading>
              <HStack pt={10} pb={3}>
                <NumberInputRoot
                  maxWidth="80px"
                  min={1}
                  max={Math.min(8, show.availableSeatCount)}
                  value={reservedSeatCount}
                  onValueChange={(e) => setReservedSeatCount(e.value)}
                >
                  <NumberInputField />
                </NumberInputRoot>               
                <Heading size="md">Tickets</Heading>
              </HStack>
              <Box textAlign="center">
                <Button onClick={onSubmit}>purchase</Button>
              </Box>
            </>
          )}
        </VStack>
      ) : null}
    </Stack>
  );
};
