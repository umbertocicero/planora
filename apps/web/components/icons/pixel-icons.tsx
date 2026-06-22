interface PixelIconProps {
  size?: number;
  className?: string;
}

export function PixelEnvelope({ size = 64, className }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="1"  y="3"  width="14" height="10" fill="#5D8A3A"/>
      <rect x="1"  y="3"  width="14" height="1"  fill="#8BC34A"/>
      <rect x="1"  y="3"  width="1"  height="10" fill="#8BC34A"/>
      <rect x="1"  y="12" width="14" height="1"  fill="#2E5A1A"/>
      <rect x="14" y="3"  width="1"  height="10" fill="#2E5A1A"/>
      <rect x="1"  y="4"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="3"  y="5"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="5"  y="6"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="7"  y="7"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="9"  y="6"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="11" y="5"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="13" y="4"  width="2"  height="1"  fill="#3A7A1E"/>
      <rect x="4"  y="9"  width="8"  height="1"  fill="#C8E6A0"/>
      <rect x="4"  y="11" width="5"  height="1"  fill="#C8E6A0"/>
    </svg>
  );
}

export function PixelClock({ size = 56, className }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="3"  y="1"  width="10" height="2"  fill="#F2A93C"/>
      <rect x="1"  y="3"  width="2"  height="10" fill="#F2A93C"/>
      <rect x="13" y="3"  width="2"  height="10" fill="#F2A93C"/>
      <rect x="3"  y="13" width="10" height="2"  fill="#F2A93C"/>
      <rect x="2"  y="2"  width="2"  height="2"  fill="#F2A93C"/>
      <rect x="12" y="2"  width="2"  height="2"  fill="#F2A93C"/>
      <rect x="2"  y="12" width="2"  height="2"  fill="#F2A93C"/>
      <rect x="12" y="12" width="2"  height="2"  fill="#F2A93C"/>
      <rect x="3"  y="3"  width="10" height="10" fill="#C77E2A"/>
      <rect x="7"  y="4"  width="2"  height="4"  fill="#FFFFFF"/>
      <rect x="8"  y="7"  width="3"  height="2"  fill="#FFFFFF"/>
      <rect x="7"  y="7"  width="2"  height="2"  fill="#FFD700"/>
      <rect x="3"  y="1"  width="10" height="1"  fill="#FCCA6A"/>
      <rect x="1"  y="3"  width="1"  height="10" fill="#FCCA6A"/>
    </svg>
  );
}

export function PixelErrorX({ size = 56, className }: PixelIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="2"  y="2"  width="12" height="12" fill="#D6352B"/>
      <rect x="2"  y="2"  width="12" height="1"  fill="#E74C3C"/>
      <rect x="2"  y="2"  width="1"  height="12" fill="#E74C3C"/>
      <rect x="2"  y="13" width="12" height="1"  fill="#7B241C"/>
      <rect x="13" y="2"  width="1"  height="12" fill="#7B241C"/>
      <rect x="4"  y="4"  width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="6"  y="6"  width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="8"  y="8"  width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="10" y="10" width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="10" y="4"  width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="8"  y="6"  width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="6"  y="8"  width="2"  height="2"  fill="#FFFFFF"/>
      <rect x="4"  y="10" width="2"  height="2"  fill="#FFFFFF"/>
    </svg>
  );
}
