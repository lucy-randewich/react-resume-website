create table if not exists public.shrimp_game_sessions (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '2 hours'),
  used_at timestamptz,
  check (expires_at > started_at),
  check (used_at is null or used_at >= started_at)
);

create index if not exists shrimp_game_sessions_expires_at_idx
on public.shrimp_game_sessions (expires_at);

alter table public.shrimp_game_sessions enable row level security;

revoke all on public.shrimp_game_sessions from public, anon, authenticated;
grant select, insert, update, delete on public.shrimp_game_sessions
to service_role;

revoke execute on function public.submit_shrimp_leaderboard_score(text, integer)
from public, anon, authenticated;

revoke execute on function public.submit_shrimp_score(integer)
from public, anon, authenticated;

create or replace function public.submit_shrimp_leaderboard_score_from_session(
  game_session_id uuid,
  player_name text,
  candidate_score integer
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  inserted_id bigint;
  consumed_session_id uuid;
begin
  if char_length(btrim(player_name)) not between 1 and 16 then
    raise exception 'Name must be between 1 and 16 characters';
  end if;

  if candidate_score < 1 or candidate_score > 10000 then
    raise exception 'Score must be between 1 and 10000';
  end if;

  update public.shrimp_game_sessions
  set used_at = now()
  where id = game_session_id
    and used_at is null
    and expires_at > now()
    and candidate_score <= least(
      10000,
      floor(extract(epoch from (now() - started_at)) / 0.4)::integer + 3
    )
  returning id into consumed_session_id;

  if consumed_session_id is null then
    raise exception 'Game session is invalid, expired, already used, or too short';
  end if;

  insert into public.shrimp_scores (player_name, score)
  values (btrim(player_name), candidate_score)
  returning id into inserted_id;

  return inserted_id;
end;
$$;

revoke all on function public.submit_shrimp_leaderboard_score_from_session(
  uuid,
  text,
  integer
) from public, anon, authenticated;

grant execute on function public.submit_shrimp_leaderboard_score_from_session(
  uuid,
  text,
  integer
) to service_role;
