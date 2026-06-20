export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/svg+xml';

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
    <rect width="180" height="180" rx="32" fill="#5D8A3A"/>
    <text x="90" y="132" font-family="monospace" font-size="120" font-weight="bold" text-anchor="middle" fill="white">P</text>
  </svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
