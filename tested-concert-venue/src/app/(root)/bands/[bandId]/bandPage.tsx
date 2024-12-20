import { LoadingSpinner } from "@/src/components/_common/LoadingSpinner";
import { QueryError } from "@/src/components/_common/QueryError";
import { Band } from "@/src/lib/features/bands/types";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function BandPage({
  band,
  error  
}: {
  band: Band | null;
  error: string | null  
}): React.ReactElement {
  
  if(error){
    return <QueryError message={error} />
  }

  return (
    <Box m={5} pt={5} textAlign="center">
      {!band ? (
        <LoadingSpinner display={!!band} />
      ) : (
        <VStack display={band ? "inherit" : "none"}>
          <Heading>{band.name}</Heading>
          <Text fontSize="xl" pb={5}>
            {band.description}
          </Text>
          <Box minW="70%" h="30em" pos="relative" textAlign="center">
            <Image
              src={`/band-images/${band.image?.fileName}`}
              alt="band photo"
              objectFit="scale-down"
              layout="fill"
            />
          </Box>

          <Text
            fontStyle="italic"
            color="gray.300"
            fontFamily="Lato"
            fontSize="sm"
          >
            photo by{" "}
            <Link href={band.image?.authorLink}>
              {band.image?.authorName}
            </Link>
          </Text>
        </VStack>
      )}
    </Box>
  );
}