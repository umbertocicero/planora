'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import {
  Copy,
  Check,
  Share2,
  QrCode,
  Mail,
  MessageCircle,
} from 'lucide-react';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock poll data - in real app, fetch from API
const mockPoll = {
  id: '123',
  shortId: 'abc123',
  title: 'Which logo do you prefer?',
  description: 'We are redesigning our brand and need your feedback!',
  pollType: 'single_choice' as const,
  options: [
    { id: '1', text: 'Option A - Modern' },
    { id: '2', text: 'Option B - Classic' },
    { id: '3', text: 'Option C - Minimalist' },
  ],
  requireName: true,
  showResultsBeforeVote: true,
  results: [
    { optionId: '1', voteCount: 12, percentage: 40, voterNames: ['Alice', 'Bob'] },
    { optionId: '2', voteCount: 15, percentage: 50, voterNames: ['Charlie', 'David'] },
    { optionId: '3', voteCount: 3, percentage: 10, voterNames: ['Eve'] },
  ],
};

export default function PollVotePage() {
  const t = useTranslations();
  const params = useParams();
  const pollId = params.id as string;

  const [poll, setPoll] = useState(mockPoll);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [voterName, setVoterName] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const pollUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/polls/${pollId}` 
    : '';

  const handleVote = () => {
    if (poll.requireName && !voterName.trim()) {
      toast.error(t('poll.vote.namePlaceholder'));
      return;
    }
    if (selectedOptions.length === 0) {
      toast.error(t('poll.vote.selectOption'));
      return;
    }

    // In real app, submit to API
    console.log('Voting:', { options: selectedOptions, name: voterName });
    
    setHasVoted(true);
    setShowResults(true);
    toast.success(t('poll.vote.voteRecorded'));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pollUrl);
    setCopied(true);
    toast.success(t('common.copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = `Vote on: ${poll.title}`;
    const urls: Record<string, string> = {
      email: `mailto:?subject=${encodeURIComponent(poll.title)}&body=${encodeURIComponent(text + '\n' + pollUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + pollUrl)}`,
      teams: `https://teams.microsoft.com/share?href=${encodeURIComponent(pollUrl)}&text=${encodeURIComponent(text)}`,
    };
    window.open(urls[platform], '_blank');
  };

  const totalVotes = poll.results.reduce((sum, r) => sum + r.voteCount, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Poll Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{poll.title}</CardTitle>
              {poll.description && (
                <CardDescription>{poll.description}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Voter Name */}
              {poll.requireName && !hasVoted && (
                <div>
                  <Label htmlFor="voterName">{t('poll.vote.yourName')}</Label>
                  <Input
                    id="voterName"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    placeholder={t('poll.vote.namePlaceholder')}
                    className="mt-1.5"
                  />
                </div>
              )}

              {/* Options / Results */}
              {showResults || poll.showResultsBeforeVote ? (
                <div className="space-y-3">
                  {poll.options.map((option) => {
                    const result = poll.results.find(
                      (r) => r.optionId === option.id
                    );
                    return (
                      <div key={option.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{option.text}</span>
                          <span className="text-muted-foreground">
                            {result?.voteCount || 0} ({result?.percentage || 0}%)
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${result?.percentage || 0}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-sm text-muted-foreground">
                    {t('poll.results.totalVotes', { count: totalVotes })}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {poll.pollType === 'single_choice' ? (
                    <RadioGroup
                      value={selectedOptions[0]}
                      onValueChange={(value) => setSelectedOptions([value])}
                    >
                      {poll.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label
                            htmlFor={option.id}
                            className="flex-1 cursor-pointer"
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    poll.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <Checkbox
                          id={option.id}
                          checked={selectedOptions.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOptions([...selectedOptions, option.id]);
                            } else {
                              setSelectedOptions(
                                selectedOptions.filter((id) => id !== option.id)
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={option.id}
                          className="flex-1 cursor-pointer"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex-col gap-4">
              {!hasVoted && (
                <Button onClick={handleVote} className="w-full" size="lg">
                  {t('poll.vote.submitVote')}
                </Button>
              )}

              {hasVoted && (
                <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent/10 p-4 text-accent">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">{t('poll.vote.voteRecorded')}</span>
                </div>
              )}
            </CardFooter>
          </Card>

          {/* Share Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Share2 className="h-5 w-5" />
                {t('poll.share.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Copy Link */}
              <div className="flex gap-2">
                <Input value={pollUrl} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowQR(!showQR)}
                  className="gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  {t('poll.share.qrCode')}
                </Button>
              </div>

              {showQR && (
                <div className="flex justify-center rounded-lg bg-white p-4">
                  <QRCodeSVG value={pollUrl} size={200} />
                </div>
              )}

              {/* Share Buttons */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('email')}
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('whatsapp')}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
