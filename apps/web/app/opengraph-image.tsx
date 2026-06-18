import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          color: '#ffffff',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system',
          padding: '64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 20,
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                fontWeight: 700,
              }}
            >
              P
            </div>
            <div style={{ fontSize: 54, fontWeight: 700 }}>Planora</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1 }}>
              Polls and Scheduling, Simplified
            </div>
            <div style={{ fontSize: 30, opacity: 0.9 }}>
              Create polls, share links, collect votes in minutes.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}