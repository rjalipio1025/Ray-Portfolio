import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#070b12" }}>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M10 10.5 16 16l6-5.5M16 16v6" stroke="#3bb9ff" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="10" cy="10.5" r="2.4" fill="#eceae5" />
          <circle cx="22" cy="10.5" r="2.4" fill="#eceae5" />
          <circle cx="16" cy="22" r="2.4" fill="#3bb9ff" />
        </svg>
      </div>
    ),
    size,
  );
}
