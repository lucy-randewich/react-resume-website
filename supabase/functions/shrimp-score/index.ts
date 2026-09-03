import { createClient } from "npm:@supabase/supabase-js@2.112.3";
import { parseShrimpScoreRequest } from "./validation.ts";

const allowedOrigins = new Set([
  "https://lucyrandewich.co.uk",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const corsHeaders = (request: Request) => {
  const origin = request.headers.get("origin");
  return {
    ...(origin && allowedOrigins.has(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
};

const json = (request: Request, body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders(request) });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  if (request.method !== "POST") {
    return json(request, { error: "Method not allowed" }, 405);
  }

  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.has(origin)) {
    return json(request, { error: "Origin not allowed" }, 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid request" }, 400);
  }

  const payload = parseShrimpScoreRequest(body);
  if (!payload) return json(request, { error: "Invalid request" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(request, { error: "Service unavailable" }, 503);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (payload.action === "start") {
    const { data, error } = await supabase
      .from("shrimp_game_sessions")
      .insert({})
      .select("id")
      .single();

    if (error) return json(request, { error: "Could not start game" }, 500);
    return json(request, { sessionId: data.id }, 201);
  }

  const { error } = await supabase.rpc(
    "submit_shrimp_leaderboard_score_from_session",
    {
      game_session_id: payload.sessionId,
      player_name: payload.playerName,
      candidate_score: payload.score,
    },
  );

  if (error) return json(request, { error: "Score could not be saved" }, 400);
  return json(request, { ok: true });
});
