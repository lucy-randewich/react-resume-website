import { describe, expect, it } from "vitest";
import { parseShrimpScoreRequest } from "./validation";

const sessionId = "123e4567-e89b-42d3-a456-426614174000";

describe("shrimp score request validation", () => {
  it("accepts start requests", () => {
    expect(parseShrimpScoreRequest({ action: "start" })).toEqual({
      action: "start",
    });
  });

  it("trims and accepts valid score submissions", () => {
    expect(
      parseShrimpScoreRequest({
        action: "submit",
        sessionId,
        playerName: "  Lucy  ",
        score: 67,
      }),
    ).toEqual({ action: "submit", sessionId, playerName: "Lucy", score: 67 });
  });

  it.each([
    { action: "submit", sessionId: "not-a-uuid", playerName: "Lucy", score: 1 },
    { action: "submit", sessionId, playerName: "", score: 1 },
    { action: "submit", sessionId, playerName: "Lucy", score: 0 },
    { action: "submit", sessionId, playerName: "Lucy", score: 1.5 },
  ])("rejects malformed submissions", (request) => {
    expect(parseShrimpScoreRequest(request)).toBeNull();
  });
});
