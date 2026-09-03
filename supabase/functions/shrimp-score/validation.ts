export type ShrimpScoreRequest =
  | { action: "start" }
  | {
      action: "submit";
      sessionId: string;
      playerName: string;
      score: number;
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const parseShrimpScoreRequest = (
  value: unknown,
): ShrimpScoreRequest | null => {
  if (!isRecord(value)) return null;
  if (value.action === "start") return { action: "start" };

  if (
    value.action !== "submit" ||
    typeof value.sessionId !== "string" ||
    typeof value.playerName !== "string" ||
    typeof value.score !== "number" ||
    !Number.isInteger(value.score)
  ) {
    return null;
  }

  const playerName = value.playerName.trim();
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value.sessionId,
    ) ||
    playerName.length < 1 ||
    playerName.length > 16 ||
    value.score < 1 ||
    value.score > 10000
  ) {
    return null;
  }

  return {
    action: "submit",
    sessionId: value.sessionId,
    playerName,
    score: value.score,
  };
};
