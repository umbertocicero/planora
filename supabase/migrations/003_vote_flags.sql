-- ===========================================
-- v1.1 — Poll voting flags
-- ===========================================

-- Feature 1: per-poll flag to enable the "I'm not available" vote option.
-- Previously this option was always shown on calendar polls; now the poll
-- creator can turn it on/off. Defaults to true to preserve existing behavior.
ALTER TABLE public.polls
  ADD COLUMN IF NOT EXISTS allow_not_available BOOLEAN DEFAULT true;

-- Feature 2: per-poll flag to let voters attach a comment to their vote.
-- Opt-in, so it defaults to false.
ALTER TABLE public.polls
  ADD COLUMN IF NOT EXISTS allow_comments BOOLEAN DEFAULT false;

-- Optional free-text comment stored on each vote row.
ALTER TABLE public.votes
  ADD COLUMN IF NOT EXISTS comment TEXT;
