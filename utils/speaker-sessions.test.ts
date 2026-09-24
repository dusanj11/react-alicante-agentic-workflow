import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { getSessionsBySpeaker } from "./speaker-sessions";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("getSessionsBySpeaker", () => {
  it("groups sessions by speaker, sorted alphabetically by name", () => {
    const speakers = getSessionsBySpeaker([
      session({ id: "1", speaker: "Sofia Almeida" }),
      session({ id: "2", speaker: "Diego Castellanos" }),
      session({ id: "3", speaker: "Sofia Almeida" }),
    ]);

    expect(speakers).toEqual([
      {
        speaker: "Diego Castellanos",
        sessions: [session({ id: "2", speaker: "Diego Castellanos" })],
      },
      {
        speaker: "Sofia Almeida",
        sessions: [
          session({ id: "1", speaker: "Sofia Almeida" }),
          session({ id: "3", speaker: "Sofia Almeida" }),
        ],
      },
    ]);
  });

  it("keeps a speaker's own sessions in the order they appear", () => {
    const speakers = getSessionsBySpeaker([
      session({ id: "1", speaker: "Iker Otxoa", title: "Second talk" }),
      session({ id: "2", speaker: "Iker Otxoa", title: "First talk" }),
    ]);

    expect(speakers[0].sessions.map((s) => s.title)).toEqual([
      "Second talk",
      "First talk",
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(getSessionsBySpeaker([])).toEqual([]);
  });
});
