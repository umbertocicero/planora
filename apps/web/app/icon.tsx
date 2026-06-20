export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/svg+xml';

export default function Icon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#5D8A3A"/>
    <text x="256" y="380" font-family="monospace" font-size="360" font-weight="bold" text-anchor="middle" fill="white">P</text>
  </svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
