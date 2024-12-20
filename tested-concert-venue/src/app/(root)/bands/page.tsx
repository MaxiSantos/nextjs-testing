import { Box, Heading, List, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { BandLinkHeading } from "@/src/components/bands/BandLinkHeading";
import { getBands } from "@/src/lib/features/bands/queries";

const removeLeadingThe = (bandName: string) => bandName.replace(/^the /i, "");

// ISR reference
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

export async function _getBands() {
  const isrBands = await getBands();
  isrBands.sort((a, b) =>
    removeLeadingThe(a.name) > removeLeadingThe(b.name) ? 0 : -1
  );
  return JSON.stringify(isrBands)
}

export default async function Bands(): Promise<React.ReactElement> {
  const isrBands = JSON.parse(await _getBands());
  //const isrBands = [];
  console.log({ isrBands })
  return (
    <Stack align="center" spacing={10}>
      <Heading mt={10}>Our Illustrious Performers</Heading>
      <List.Root alignContent="center" pb={10}>
        {isrBands.map((band) => (
          <List.Item key={band.id} display="flex" mb={10} alignItems="center">
            <Box>
              <BandLinkHeading band={band} />
              <Text fontStyle="italic" color="gray.400" fontFamily="Lato">
                {band.description}
              </Text>
            </Box>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  );
}
