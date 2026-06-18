'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <span className="text-xl font-bold">Planora</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link
            href="/polls/create"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('createPoll')}
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('dashboard')}
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden items-center space-x-4 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">{t('login')}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">{t('signup')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              href="/polls/create"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('createPoll')}
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('dashboard')}
            </Link>
            <div className="flex items-center space-x-4 pt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="flex space-x-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href="/login">{t('login')}</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href="/signup">{t('signup')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
