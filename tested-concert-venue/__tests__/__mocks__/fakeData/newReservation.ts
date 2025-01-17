import { Reservation } from "@/src/lib/features/reservations/types";

export const generateNewReservation = ({
  reservationId,
  showId,
  seatCount,
}: {
  reservationId: number;
  showId: number;
  seatCount: number;
}): Reservation => ({
  id: reservationId,
  showId,
  userId: showId,
  seatCount,
});
