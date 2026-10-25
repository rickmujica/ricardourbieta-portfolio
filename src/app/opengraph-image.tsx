import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a1a1a1" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 44,
              background: "#fff",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            RU
          </div>
          {site.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#a1a1a1", maxWidth: 900 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {projects.map((p) => (
            <div
              key={p.slug}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 22,
                color: "#d4d4d4",
              }}
            >
              {p.title}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
