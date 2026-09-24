-- Issue #2: show each session's level. `level` is modeled as an enum, same
-- as `track` in 20260918100000_session_track_enum.sql, so the allowed values
-- are part of the schema and `pnpm db:types` generates a union type for them.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- Nullable for now so the 8 existing rows can be backfilled before the
-- not-null constraint below is added.
alter table public.sessions
  add column if not exists level public.session_level;

-- Backfill. The ticket has no specified level per session ("the details are
-- yours"), so levels are inferred from each session's title/description in
-- 20260917090100_seed_sessions.sql: keynote/panel sessions are pitched at
-- everyone (beginner), hands-on/practical sessions sit at intermediate, and
-- sessions billed as going past the basics ("Beyond the Tutorial", a "deep
-- dive", org-chart-level architecture trade-offs) are advanced.
update public.sessions set level = 'beginner'     where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced'     where id = 'server-components-deep-dive';
update public.sessions set level = 'advanced'     where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced'     where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner'     where id = 'closing-panel';

-- Safety net: any row this migration doesn't recognize (e.g. one inserted
-- after this file was written, before it runs) still needs a level before
-- the not-null constraint can be added. Default the rest to intermediate
-- rather than leaving them null.
update public.sessions set level = 'intermediate' where level is null;

alter table public.sessions
  alter column level set not null;

-- No RLS/policy change: the existing "Sessions are publicly readable" policy
-- from 20260917090000_create_sessions.sql is per-row, not per-column, so it
-- already covers the new column for anon/authenticated reads.
