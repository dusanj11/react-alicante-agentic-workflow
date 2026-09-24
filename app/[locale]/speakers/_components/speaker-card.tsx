import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

export function SpeakerCard({
  speaker,
  sessions,
}: {
  speaker: string;
  sessions: Session[];
}) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="2" listStyleType="none">
          {sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Text fontSize="sm" color="var(--text-secondary)">
                  {session.title} · {session.startTime}
                </Text>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
