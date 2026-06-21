import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  // 1. Verify the requester is authenticated (cookie-based session).
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  // 2. Admin client bypasses RLS so we can purge all user data.
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    // Delete polls created by the user.
    // poll_options and votes are removed via ON DELETE CASCADE.
    const { error: pollsError } = await admin
      .from('polls')
      .delete()
      .eq('creator_id', user.id);
    if (pollsError) throw pollsError;

    // Delete votes the user cast on other people's polls.
    const { error: votesError } = await admin
      .from('votes')
      .delete()
      .eq('user_id', user.id);
    if (votesError) throw votesError;

    // Finally remove the auth user. This cascades to public.profiles
    // (profiles.id REFERENCES auth.users ON DELETE CASCADE).
    const { error: deleteUserError } = await admin.auth.admin.deleteUser(user.id);
    if (deleteUserError) throw deleteUserError;
  } catch (error) {
    console.error('Account deletion failed:', error);
    return NextResponse.json({ error: 'deletion_failed' }, { status: 500 });
  }

  // 3. Clear the local session.
  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}
