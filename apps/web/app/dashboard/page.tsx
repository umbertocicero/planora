'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Plus, BarChart3, Users, FileText } from 'lucide-react';

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

// Mock data
const mockStats = {
  totalPolls: 12,
  activePolls: 5,
  totalVotes: 234,
};

const mockPolls = [
  {
    id: '1',
    shortId: 'abc123',
    title: 'Team lunch location',
    status: 'active',
    voteCount: 8,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    shortId: 'def456',
    title: 'Project deadline preference',
    status: 'active',
    voteCount: 12,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    shortId: 'ghi789',
    title: 'Office party theme',
    status: 'closed',
    voteCount: 25,
    createdAt: '2024-01-10',
  },
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');

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
                <div className="text-2xl font-bold">{mockStats.totalPolls}</div>
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
                <div className="text-2xl font-bold">{mockStats.activePolls}</div>
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
                <div className="text-2xl font-bold">{mockStats.totalVotes}</div>
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
              {mockPolls.length === 0 ? (
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
                  {mockPolls.map((poll) => (
                    <Link
                      key={poll.id}
                      href={`/polls/${poll.shortId}`}
                      className="flex items-center justify-between py-4 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <h3 className="font-medium">{poll.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Created {poll.createdAt} • {poll.voteCount} votes
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
