import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.title}. ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");
const [sansSemi, sansRegular, mono] = await Promise.all([
  readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
  readFile(join(fontDir, "geist-sans/Geist-Regular.ttf")),
  readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
]);

const path = [
  ["User", "Employees"],
  ["Identity", "Okta · Entra ID"],
  ["Device", "Jamf Pro · Intune"],
  ["Applications", "Microsoft 365 · Slack"],
  ["Security", "CrowdStrike"],
];

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#070b12",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(59,185,255,0.16), transparent 45%), radial-gradient(circle at 10% 110%, rgba(143,135,255,0.10), transparent 40%)",
          color: "#eceae5",
          fontFamily: "Geist",
          padding: "72px 76px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 3, color: "#3bb9ff" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: "#3bb9ff" }} />
              IT SYSTEMS ADMINISTRATOR
            </div>
            <div style={{ marginTop: 34, fontSize: 78, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 36, color: "#a3acba", letterSpacing: -1 }}>
              I keep people, devices, and access&nbsp;<span style={{ color: "#eceae5" }}>moving.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 19, color: "#7c8699", gap: 18 }}>
            <span style={{ color: "#eceae5" }}>12+ years</span>
            <span>Intune · Jamf Pro · Entra ID · Okta · Microsoft 365 · Google Workspace</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 40,
            paddingLeft: 36,
            borderLeft: "1px solid #1c2433",
            gap: 22,
            width: 300,
          }}
        >
          {path.map(([layer, value], i) => (
            <div key={layer} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: i === 0 ? "#3bb9ff" : "#070b12",
                  border: "2px solid #3bb9ff",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "Geist Mono", fontSize: 14, letterSpacing: 2, color: "#7c8699" }}>{layer.toUpperCase()}</span>
                <span style={{ fontSize: 21, color: "#eceae5", marginTop: 2 }}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sansRegular, weight: 400, style: "normal" },
        { name: "Geist", data: sansSemi, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
