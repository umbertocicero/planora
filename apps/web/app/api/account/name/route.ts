import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  // 1. Verify the requester is authenticated (cookie-based session).
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // 2. Validate input.
  let body: { fullName?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  if (!fullName || fullName.length > 60) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  // 3. Admin client bypasses RLS (votes has no UPDATE policy).
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    // Display name source of truth used by the poll voting page.
    const { error: profileError } = await admin
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);
    if (profileError) throw profileError;

    // Propagate the new name to every vote this user has already cast.
    const { error: votesError } = await admin
      .from('votes')
      .update({ voter_name: fullName })
      .eq('user_id', user.id);
    if (votesError) throw votesError;
  } catch (error) {
    console.error('Failed to update display name:', error);
    return NextResponse.json({ error: 'update_failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
