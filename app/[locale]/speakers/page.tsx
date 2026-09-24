import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSessionsBySpeaker } from "@/utils/speaker-sessions";
import { Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = getSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Every speaker at React Alicante, and the sessions they&apos;re giving.
      </PageHeading>

      <Grid gap="4" templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}>
        {speakers.map(({ speaker, sessions: speakerSessions }) => (
          <SpeakerCard
            key={speaker}
            speaker={speaker}
            sessions={speakerSessions}
          />
        ))}
      </Grid>
    </Flex>
  );
}
