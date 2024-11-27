import { Box, Flex, ListItem } from "@chakra-ui/react";

import { BandLinkHeading } from "@/src/components/bands/BandLinkHeading";
import type { ReservationWithShow } from "@/src/lib/features/reservations/types";
import { formatDate } from "@/src/lib/features/shows/utils";

export const UserReservation = ({
  reservation,
}: {
  reservation: ReservationWithShow;
}) => {
  const { show, seatCount } = reservation;

  return (
    <ListItem>
      <Flex mb={3}>
        <Box mr={5} w="50%" textAlign="right">
          {formatDate(show.scheduledAt)}
        </Box>
        <Box ml={5} w="50%" textAlign="left">
          {seatCount} seats for <BandLinkHeading band={show.band} />
        </Box>
      </Flex>
    </ListItem>
  );
};
