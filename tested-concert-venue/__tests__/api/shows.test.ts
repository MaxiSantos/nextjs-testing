/* eslint-disable no-param-reassign */
import { testApiHandler } from "next-test-api-route-handler";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import showIdHandler from "@/src/app/api/shows/[showId]/route";
import showsHandler from "@/src/app/api/shows/route";

test("GET /api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();

      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

test("GET /api/shows/[showId] returns the data for the correct show ID", async () => {
  await testApiHandler({
    handler: showIdHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.showId = 0;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();

      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});

test("POST /api/shows returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    // updated not to use queryStringURLParams; for details, see
    // https://www.udemy.com/course/nextjs-testing/learn/#questions/19882336/
    paramsPatcher: (params) => {
      params.secret = "NOT THE REAL SECRET";
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toEqual(401);
    },
  });
});
