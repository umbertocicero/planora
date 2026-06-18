import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">P</span>
            </div>
            <span className="text-xl font-bold">Planora</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/polls/create" className="hover:text-foreground transition-colors">
              Crea Sondaggio
            </Link>
            <Link href="/#features" className="hover:text-foreground transition-colors">
              Funzionalità
            </Link>
          </nav>

          {/* Credits */}
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by Umberto Antonio Cicero
          </p>
        </div>
      </div>
    </footer>
  );
}
