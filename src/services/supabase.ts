import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey,
);

export interface LeaderboardEntry {
  id: number;
  playerName: string;
  score: number;
}

let supabasePromise: Promise<SupabaseClient> | null = null;

const getSupabase = () => {
  if (!isSupabaseConfigured) return null;
  supabasePromise ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(supabaseUrl, supabasePublishableKey),
  );
  return supabasePromise;
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("shrimp_scores")
    .select("id, player_name, score")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(5);
  if (error) throw error;
  return data.map(({ id, player_name, score }) => ({
    id: id as number,
    playerName: player_name as string,
    score: score as number,
  }));
};

export const getWorldRecord = async () => {
  const [leader] = await getLeaderboard();
  return leader?.score ?? 0;
};

export const startShrimpGameSession = async (): Promise<string | null> => {
  const supabase = await getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.functions.invoke("shrimp-score", {
    body: { action: "start" },
  });
  if (error) throw error;
  if (!data || typeof data.sessionId !== "string") {
    throw new Error("The game session could not be started");
  }
  return data.sessionId;
};

export const submitLeaderboardScore = async (
  name: string,
  score: number,
  sessionId: string,
) => {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { error } = await supabase.functions.invoke("shrimp-score", {
    body: {
      action: "submit",
      sessionId,
      playerName: name,
      score,
    },
  });
  if (error) throw error;
  return getLeaderboard();
};
