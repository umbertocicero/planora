'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plus, BarChart3, Users, FileText, Loader2 } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Poll {
  id: string;
  short_id: string;
  title: string;
  status: string;
  created_at: string;
}

interface PollWithVotes extends Poll {
  voteCount: number;
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const [polls, setPolls] = useState<PollWithVotes[]>([]);
  const [stats, setStats] = useState({
    totalPolls: 0,
    activePolls: 0,
    totalVotes: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    const supabase = createClient();
    
    // Fetch all polls
    const { data: pollsData, error: pollsError } = await supabase
      .from('polls')
      .select('*')
      .order('created_at', { ascending: false });

    if (pollsError) {
      console.error('Error fetching polls:', pollsError);
      setLoading(false);
      return;
    }

    const pollsList = pollsData || [];

    // Fetch vote counts for each poll
    const pollsWithVotes: PollWithVotes[] = await Promise.all(
      pollsList.map(async (poll) => {
        const { count } = await supabase
          .from('votes')
          .select('*', { count: 'exact', head: true })
          .eq('poll_id', poll.id);

        return {
          ...poll,
          voteCount: count || 0,
        };
      })
    );

    setPolls(pollsWithVotes);

    // Calculate stats
    const totalPolls = pollsList.length;
    const activePolls = pollsList.filter(p => p.status === 'active').length;
    const totalVotes = pollsWithVotes.reduce((sum, p) => sum + p.voteCount, 0);

    setStats({
      totalPolls,
      activePolls,
      totalVotes,
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              <p className="text-muted-foreground">
                {t('welcome', { name: 'User' })}
              </p>
            </div>
            <Button asChild>
              <Link href="/polls/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Poll
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('stats.totalPolls')}
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPolls}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('stats.activePolls')}
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activePolls}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('stats.totalVotes')}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVotes}</div>
              </CardContent>
            </Card>
          </div>

          {/* Polls List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Polls</CardTitle>
              <CardDescription>
                Manage and view results of your polls
              </CardDescription>
            </CardHeader>
            <CardContent>
              {polls.length === 0 ? (
                <div className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">{t('empty.title')}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {t('empty.description')}
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/polls/create">{t('empty.cta')}</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  {polls.map((poll) => (
                    <Link
                      key={poll.id}
                      href={`/polls/${poll.short_id}`}
                      className="flex items-center justify-between py-4 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <h3 className="font-medium">{poll.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created {formatDate(poll.created_at)} • {poll.voteCount} votes
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          poll.status === 'active'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {poll.status}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
