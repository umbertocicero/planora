-- Ensure poll_results executes with the querying user's permissions (RLS-safe)
ALTER VIEW public.poll_results SET (security_invoker = true);
