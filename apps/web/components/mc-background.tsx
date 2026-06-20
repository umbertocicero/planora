'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/* ── Static landscape data ───────────────────────────────────── */

const STARS = [
  { x: 15, y: 10, s: 2, o: 0.9 },  { x: 48, y: 24, s: 2, o: 0.7 },
  { x: 76, y: 8, s: 1, o: 0.5 },   { x: 98, y: 40, s: 2, o: 0.8 },
  { x: 125, y: 14, s: 1, o: 0.6 },  { x: 152, y: 32, s: 2, o: 0.9 },
  { x: 178, y: 18, s: 1, o: 0.4 },  { x: 202, y: 44, s: 2, o: 0.7 },
  { x: 228, y: 6, s: 2, o: 0.8 },   { x: 255, y: 28, s: 1, o: 0.6 },
  { x: 285, y: 50, s: 2, o: 0.9 },  { x: 312, y: 16, s: 1, o: 0.5 },
  { x: 338, y: 38, s: 2, o: 0.7 },  { x: 358, y: 10, s: 2, o: 0.8 },
  { x: 415, y: 22, s: 1, o: 0.6 },  { x: 435, y: 52, s: 2, o: 0.9 },
  { x: 462, y: 20, s: 1, o: 0.4 },  { x: 32, y: 56, s: 1, o: 0.5 },
  { x: 108, y: 64, s: 2, o: 0.7 },  { x: 145, y: 72, s: 1, o: 0.6 },
  { x: 228, y: 58, s: 2, o: 0.8 },  { x: 302, y: 68, s: 1, o: 0.5 },
  { x: 355, y: 74, s: 2, o: 0.7 },  { x: 445, y: 78, s: 1, o: 0.6 },
  { x: 472, y: 42, s: 2, o: 0.9 },  { x: 8, y: 36, s: 1, o: 0.4 },
  { x: 168, y: 60, s: 1, o: 0.5 },  { x: 390, y: 64, s: 2, o: 0.8 },
];

const TREES_NEAR = [
  { x: 52, gy: 192 },
  { x: 86, gy: 178 },
  { x: 124, gy: 162 },
  { x: 164, gy: 156 },
  { x: 236, gy: 166 },
  { x: 268, gy: 172 },
  { x: 396, gy: 190 },
  { x: 420, gy: 174 },
  { x: 454, gy: 186 },
];

const TREES_MID = [
  { x: 310, gy: 158 },
  { x: 342, gy: 150 },
  { x: 366, gy: 154 },
];

const NEAR_STEPS = [
  { x: 0, y: 214 },   { x: 16, y: 208 },  { x: 32, y: 200 },
  { x: 48, y: 192 },  { x: 64, y: 184 },  { x: 80, y: 178 },
  { x: 96, y: 172 },  { x: 112, y: 166 }, { x: 128, y: 162 },
  { x: 144, y: 158 }, { x: 160, y: 156 }, { x: 176, y: 154 },
  { x: 192, y: 154 }, { x: 208, y: 156 }, { x: 224, y: 160 },
  { x: 240, y: 166 }, { x: 256, y: 172 }, { x: 272, y: 180 },
  { x: 288, y: 190 }, { x: 304, y: 200 }, { x: 320, y: 208 },
  { x: 336, y: 212 }, { x: 352, y: 208 }, { x: 368, y: 200 },
  { x: 384, y: 190 }, { x: 400, y: 180 }, { x: 416, y: 174 },
  { x: 432, y: 178 }, { x: 448, y: 186 }, { x: 464, y: 196 },
];

const FLOWERS = [
  { x: 58, y: 190, c: '#FF4444' },  { x: 94, y: 176, c: '#FCEE4B' },
  { x: 140, y: 160, c: '#FF88FF' }, { x: 178, y: 153, c: '#FF4444' },
  { x: 190, y: 153, c: '#FFFFFF' }, { x: 242, y: 164, c: '#FCEE4B' },
  { x: 134, y: 161, c: '#FF4444' }, { x: 404, y: 178, c: '#FF88FF' },
  { x: 426, y: 173, c: '#FCEE4B' }, { x: 460, y: 184, c: '#FFFFFF' },
  { x: 74, y: 182, c: '#FF88FF' },  { x: 210, y: 155, c: '#FF4444' },
];

const FIREFLIES = [
  { x: 300, y: 186 }, { x: 330, y: 192 }, { x: 350, y: 188 },
  { x: 280, y: 184 }, { x: 160, y: 152 }, { x: 440, y: 180 },
];

/* ── Stepped terrain paths (Minecraft block style) ───────────── */

const FAR_HILLS =
  'M0,270 V168 H16 V166 H32 V164 H48 V162 H64 V160 H80 V158 H96 V156 ' +
  'H112 V154 H128 V152 H144 V150 H160 V148 H176 V146 H192 V146 ' +
  'H208 V148 H224 V150 H240 V152 H256 V150 H272 V146 H288 V142 ' +
  'H304 V138 H320 V134 H336 V138 H352 V142 H368 V148 H384 V154 ' +
  'H400 V160 H416 V164 H432 V168 H448 V170 H464 V168 H480 V270 Z';

const MID_HILLS =
  'M0,270 V182 H16 V178 H32 V174 H48 V170 H64 V168 H80 V166 H96 V164 ' +
  'H112 V166 H128 V170 H144 V174 H160 V178 H176 V182 H192 V186 ' +
  'H208 V190 H224 V186 H240 V180 H256 V174 H272 V168 H288 V162 ' +
  'H304 V158 H320 V154 H336 V150 H352 V154 H368 V160 H384 V166 ' +
  'H400 V172 H416 V178 H432 V182 H448 V186 H464 V182 H480 V270 Z';

const NEAR_HILLS =
  'M0,270 V214 H16 V208 H32 V200 H48 V192 H64 V184 H80 V178 H96 V172 ' +
  'H112 V166 H128 V162 H144 V158 H160 V156 H176 V154 H192 V154 ' +
  'H208 V156 H224 V160 H240 V166 H256 V172 H272 V180 H288 V190 ' +
  'H304 V200 H320 V208 H336 V212 H352 V208 H368 V200 H384 V190 ' +
  'H400 V180 H416 V174 H432 V178 H448 V186 H464 V196 H480 V270 Z';

/* ── Component ───────────────────────────────────────────────── */

export function McBackground({ className = '' }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={className} />;

  const night = resolvedTheme === 'dark';

  const sky = night
    ? { top: '#050510', mid: '#0D0D2B', bot: '#151540' }
    : { top: '#4A98C9', mid: '#7EC0EE', bot: '#A8D8F5' };

  const hills = night
    ? { far: '#0C1A08', mid: '#152210', near: '#1A2810', grassTop: '#1E3012' }
    : { far: '#3A5524', mid: '#4A6E2E', near: '#5D8A3A', grassTop: '#6BA34A' };

  const lakeC = night
    ? { main: '#081828', highlight: '#0C2C42' }
    : { main: '#4A9FD9', highlight: '#68B8E8' };

  const tree = night
    ? { trunk: '#2A1A0E', leaves: '#0E1A08', top: '#0A1406' }
    : { trunk: '#6B4226', leaves: '#2B3F1A', top: '#1D2A11' };

  const dirt = night ? '#1A0E06' : '#6B4226';

  const cloud = night
    ? { main: '#252545', shadow: '#1E1E38', opacity: 0.25 }
    : { main: '#FFFFFF', shadow: '#D8E4F0', opacity: 0.9 };

  return (
    <div className={className}>
      <svg
        viewBox="0 0 480 270"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full block"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* ── Sky gradient ── */}
        <defs>
          <linearGradient id="mcSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sky.top} />
            <stop offset="50%" stopColor={sky.mid} />
            <stop offset="100%" stopColor={sky.bot} />
          </linearGradient>
        </defs>
        <rect width="480" height="270" fill="url(#mcSkyGrad)" />

        {/* ── Stars (night) ── */}
        {night &&
          STARS.map((s, i) => (
            <rect
              key={`s${i}`}
              x={s.x}
              y={s.y}
              width={s.s}
              height={s.s}
              fill={i % 5 === 0 ? '#FFFFCC' : '#FFFFFF'}
              opacity={s.o}
            >
              {i % 3 === 0 && (
                <animate
                  attributeName="opacity"
                  values={`${s.o};${s.o * 0.2};${s.o}`}
                  dur={`${2 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
          ))}

        {/* ── Moon / Sun ── */}
        {night ? (
          <g>
            <rect x={374} y={18} width={36} height={36} fill="#F0E860" opacity={0.06} />
            <rect x={378} y={22} width={28} height={28} fill="#F0E860" />
            <rect x={384} y={28} width={8} height={8} fill="#D8D040" opacity={0.4} />
            <rect x={396} y={38} width={6} height={6} fill="#D8D040" opacity={0.3} />
            <rect x={386} y={42} width={4} height={4} fill="#C8C030" opacity={0.25} />
          </g>
        ) : (
          <g>
            <rect x={368} y={12} width={48} height={48} fill="#FCEE4B" opacity={0.08} />
            <rect x={378} y={22} width={28} height={28} fill="#FCEE4B" />
            <rect x={382} y={26} width={8} height={8} fill="#FFF68F" opacity={0.5} />
            <rect x={388} y={12} width={8} height={6} fill="#FCEE4B" opacity={0.45} />
            <rect x={388} y={54} width={8} height={6} fill="#FCEE4B" opacity={0.45} />
            <rect x={368} y={32} width={6} height={8} fill="#FCEE4B" opacity={0.45} />
            <rect x={410} y={32} width={6} height={8} fill="#FCEE4B" opacity={0.45} />
          </g>
        )}

        {/* ── Clouds ── */}
        <g opacity={cloud.opacity}>
          <rect x={60} y={48} width={44} height={8} fill={cloud.main} />
          <rect x={52} y={56} width={60} height={10} fill={cloud.main} />
          <rect x={56} y={66} width={48} height={6} fill={cloud.shadow} />

          <rect x={250} y={32} width={36} height={8} fill={cloud.main} />
          <rect x={244} y={40} width={48} height={10} fill={cloud.main} />
          <rect x={248} y={50} width={40} height={6} fill={cloud.shadow} />

          <rect x={420} y={58} width={28} height={6} fill={cloud.main} />
          <rect x={416} y={64} width={36} height={8} fill={cloud.main} />
          <rect x={418} y={72} width={30} height={4} fill={cloud.shadow} />

          <rect x={150} y={80} width={22} height={6} fill={cloud.main} />
          <rect x={146} y={86} width={30} height={6} fill={cloud.shadow} />
        </g>

        {/* ── Far hills (distant mountains) ── */}
        <path d={FAR_HILLS} fill={hills.far} />

        {/* ── Mid hills ── */}
        <path d={MID_HILLS} fill={hills.mid} />

        {/* ── Trees on mid hills (small, distant) ── */}
        {TREES_MID.map((t, i) => (
          <g key={`tm${i}`}>
            <rect x={t.x} y={t.gy - 14} width={4} height={14} fill={tree.trunk} />
            <rect x={t.x - 6} y={t.gy - 24} width={16} height={10} fill={tree.leaves} />
            <rect x={t.x - 4} y={t.gy - 28} width={12} height={4} fill={tree.top} />
          </g>
        ))}

        {/* ── Near hills (main rolling hills, XP Bliss style) ── */}
        <path d={NEAR_HILLS} fill={hills.near} />

        {/* Grass-top highlights on each terrain step */}
        {NEAR_STEPS.map((step, i) => (
          <rect
            key={`g${i}`}
            x={step.x}
            y={step.y}
            width={16}
            height={3}
            fill={hills.grassTop}
          />
        ))}

        {/* ── Lake in the valley ── */}
        <rect x={286} y={188} width={118} height={2} fill={hills.near} />
        <rect x={286} y={190} width={118} height={28} fill={lakeC.main} />
        <rect x={294} y={196} width={98} height={2} fill={lakeC.highlight} opacity={0.3} />
        <rect x={300} y={204} width={72} height={2} fill={lakeC.highlight} opacity={0.2} />
        <rect x={308} y={210} width={56} height={2} fill={lakeC.highlight} opacity={0.15} />
        {night && (
          <rect x={374} y={194} width={8} height={18} fill="#F0E860" opacity={0.12} />
        )}

        {/* ── Trees on near hills (large, foreground) ── */}
        {TREES_NEAR.map((t, i) => (
          <g key={`tn${i}`}>
            <rect x={t.x} y={t.gy - 22} width={6} height={22} fill={tree.trunk} />
            <rect x={t.x - 9} y={t.gy - 36} width={24} height={14} fill={tree.leaves} />
            <rect x={t.x - 5} y={t.gy - 42} width={16} height={6} fill={tree.top} />
          </g>
        ))}

        {/* ── Dirt bottom layer ── */}
        <rect x={0} y={250} width={480} height={20} fill={dirt} />

        {/* ── Flowers (day) ── */}
        {!night &&
          FLOWERS.map((f, i) => (
            <rect key={`fl${i}`} x={f.x} y={f.y} width={3} height={3} fill={f.c} />
          ))}

        {/* ── Fireflies (night) ── */}
        {night &&
          FIREFLIES.map((ff, i) => (
            <rect
              key={`ff${i}`}
              x={ff.x}
              y={ff.y}
              width={2}
              height={2}
              fill="#AAFF44"
              opacity={0.5}
            >
              <animate
                attributeName="opacity"
                values="0.05;0.7;0.05"
                dur={`${2.5 + i * 0.7}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
      </svg>
    </div>
  );
}
