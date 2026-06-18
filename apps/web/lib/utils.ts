import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePollId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function formatDate(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  }).format(date);
}

export function formatDateTime(date: Date, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
