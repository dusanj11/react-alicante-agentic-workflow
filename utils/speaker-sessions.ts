import type { Session } from "@/types/session";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker, sorted alphabetically by speaker name. Each
 * speaker's own sessions keep the order they appear in `sessions`.
 */
export function getSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: speakerSessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
