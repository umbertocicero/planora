'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { McBackground } from '@/components/mc-background';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function AuthCodeErrorContent() {
  const t = useTranslations('auth.authCodeError');
  const searchParams = useSearchParams();
  const router = useRouter();
  const reason = searchParams.get('reason') ?? 'invalid';
  const isExpired = reason === 'expired';

  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Email inviata!');
    } catch {
      toast.error('Errore nell\'invio. Riprova o vai al login.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <McBackground className="fixed inset-0 z-0" />
      <div className="relative z-10 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Card className="mc-panel">
            <CardHeader className="text-center space-y-3">
              <div className="flex justify-center">
                {isExpired ? (
                  /* Pixel-art clock (expired) */
                  <svg viewBox="0 0 16 16" width="56" height="56" style={{ imageRendering: 'pixelated', display: 'block' }}>
                    <rect x="3" y="1" width="10" height="2" fill="#F2A93C"/>
                    <rect x="1" y="3" width="2"  height="10" fill="#F2A93C"/>
                    <rect x="13" y="3" width="2" height="10" fill="#F2A93C"/>
                    <rect x="3" y="13" width="10" height="2" fill="#F2A93C"/>
                    <rect x="2" y="2" width="2"  height="2"  fill="#F2A93C"/>
                    <rect x="12" y="2" width="2" height="2"  fill="#F2A93C"/>
                    <rect x="2" y="12" width="2" height="2"  fill="#F2A93C"/>
                    <rect x="12" y="12" width="2" height="2" fill="#F2A93C"/>
                    <rect x="3" y="3" width="10" height="10" fill="#C77E2A"/>
                    <rect x="7" y="4" width="2"  height="4"  fill="#FFFFFF"/>
                    <rect x="8" y="7" width="3"  height="2"  fill="#FFFFFF"/>
                    <rect x="7" y="7" width="2"  height="2"  fill="#FFD700"/>
                    <rect x="3" y="1" width="10" height="1"  fill="#FCCA6A"/>
                    <rect x="1" y="3" width="1"  height="10" fill="#FCCA6A"/>
                  </svg>
                ) : (
                  /* Pixel-art X / error (invalid) */
                  <svg viewBox="0 0 16 16" width="56" height="56" style={{ imageRendering: 'pixelated', display: 'block' }}>
                    <rect x="2" y="2" width="12" height="12" fill="#D6352B"/>
                    <rect x="2" y="2" width="12" height="1"  fill="#E74C3C"/>
                    <rect x="2" y="2" width="1"  height="12" fill="#E74C3C"/>
                    <rect x="2" y="13" width="12" height="1" fill="#7B241C"/>
                    <rect x="13" y="2" width="1" height="12" fill="#7B241C"/>
                    <rect x="4"  y="4"  width="2" height="2" fill="#FFFFFF"/>
                    <rect x="6"  y="6"  width="2" height="2" fill="#FFFFFF"/>
                    <rect x="8"  y="8"  width="2" height="2" fill="#FFFFFF"/>
                    <rect x="10" y="10" width="2" height="2" fill="#FFFFFF"/>
                    <rect x="10" y="4"  width="2" height="2" fill="#FFFFFF"/>
                    <rect x="8"  y="6"  width="2" height="2" fill="#FFFFFF"/>
                    <rect x="6"  y="8"  width="2" height="2" fill="#FFFFFF"/>
                    <rect x="4"  y="10" width="2" height="2" fill="#FFFFFF"/>
                  </svg>
                )}
              </div>
              <CardTitle className="font-pixel text-xl">
                {isExpired ? t('expiredTitle') : t('invalidTitle')}
              </CardTitle>
              <CardDescription className="text-base">
                {isExpired ? t('expiredDescription') : t('invalidDescription')}
                <br />
                <span className="text-muted-foreground text-sm">
                  {isExpired ? t('expiredHint') : t('invalidHint')}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {isExpired && !sent && (
                <form onSubmit={handleResend} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mc-inset"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full mc-btn bg-primary text-primary-foreground"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {sending ? 'Sending...' : t('resendEmail')}
                  </Button>
                </form>
              )}

              {sent && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  ✓ Check your inbox — a new confirmation link is on its way.
                </p>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full mc-btn"
                  onClick={() => router.push('/auth/login')}
                >
                  {t('goToLogin')}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => router.push('/')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('goHome')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AuthCodeErrorContent />
    </Suspense>
  );
}
