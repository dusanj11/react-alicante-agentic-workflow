import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Text } from "@chakra-ui/react";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Text
            fontWeight="medium"
            color="var(--text-primary)"
            lineHeight="1"
            truncate
          >
            {session.title}
          </Text>
          <Text color="var(--text-muted)" lineHeight="1" truncate>
            {session.startTime} · {session.speaker}
          </Text>
          <Text color="var(--text-muted)" lineHeight="1" truncate>
            {session.level.charAt(0).toUpperCase() + session.level.slice(1)}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
