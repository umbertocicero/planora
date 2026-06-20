import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        background: '#2A2A2A',
        borderTop: '3px solid rgba(0,0,0,0.7)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div
              className="flex h-8 w-8 items-center justify-center font-press text-white text-xs"
              style={{
                background: '#5D8A3A',
                borderTop: '3px solid rgba(255,255,255,0.55)',
                borderLeft: '3px solid rgba(255,255,255,0.55)',
                borderBottom: '3px solid rgba(0,0,0,0.5)',
                borderRight: '3px solid rgba(0,0,0,0.5)',
              }}
            >
              P
            </div>
            <span className="font-press text-xs text-[#FCEE4B]">Planora</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/polls/create"
              className="font-pixel text-xs text-[#888] hover:text-[#C6C6C6] transition-colors duration-100"
            >
              Crea Sondaggio
            </Link>
            <Link
              href="/#features"
              className="font-pixel text-xs text-[#888] hover:text-[#C6C6C6] transition-colors duration-100"
            >
              Funzionalità
            </Link>
          </nav>

          {/* Credits */}
          <p className="font-pixel text-xs text-[#555]">
            Made with{' '}
            <span className="text-[#B02E26]">&#9829;</span>{' '}
            by Umberto Antonio Cicero
          </p>
        </div>
      </div>
    </footer>
  );
}
