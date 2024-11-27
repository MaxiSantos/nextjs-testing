import path from "path";

import { filenames, getJSONfromFile } from "@/src/lib/db/db-utils";
import type { Band } from "@/src/lib/features/bands/types";
import type { Reservation } from "@/src/lib/features/reservations/types";
import type { Show } from "@/src/lib/features/shows/types";
import type { AuthUser } from "@/src/lib/features/users/types";

// store fake data in JSON files for easier command-line db reset
const JSON_FILEPATH = path.join(__dirname, "json");

export const readFakeData = async () => {
  const [fakeBands, fakeReservations, fakeShows, fakeUsers] = await Promise.all(
    [
      getJSONfromFile(filenames.bands, JSON_FILEPATH),
      getJSONfromFile(filenames.reservations, JSON_FILEPATH),
      getJSONfromFile(filenames.shows, JSON_FILEPATH),
      getJSONfromFile(filenames.users, JSON_FILEPATH),
    ]
  );

  return {
    fakeBands: fakeBands as Array<Band>,
    fakeReservations: fakeReservations as Array<Reservation>,
    fakeShows: fakeShows as Array<Show>,
    fakeUsers: fakeUsers as Array<AuthUser>,
  };
};
