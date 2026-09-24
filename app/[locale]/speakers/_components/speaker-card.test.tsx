import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerCard } from "./speaker-card";

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

describe("SpeakerCard", () => {
  it("shows the speaker's name and each of their sessions", () => {
    render(
      <SpeakerCard
        speaker="Sofia Almeida"
        sessions={[
          session({ id: "1", title: "Signals in React", startTime: "10:00" }),
          session({ id: "2", title: "Closing keynote", startTime: "17:00" }),
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Sofia Almeida" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Signals in React/)).toBeInTheDocument();
    expect(screen.getByText(/10:00/)).toBeInTheDocument();
    expect(screen.getByText(/Closing keynote/)).toBeInTheDocument();
    expect(screen.getByText(/17:00/)).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(
      <SpeakerCard
        speaker="Sofia Almeida"
        sessions={[session({ id: "signals-in-react" })]}
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/signals-in-react",
    );
  });
});
