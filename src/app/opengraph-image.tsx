import { ImageResponse } from "next/og";

import { personalInfo, siteConfig } from "@/data/personalInfo";

export const alt = `${personalInfo.fullName} — ${personalInfo.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph / social share card, generated at build time.
 * Uses only satori-safe styles (flexbox, no grid).
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#080403",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,61,36,0.42), rgba(255,61,36,0) 66%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -140,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(200,30,74,0.30), rgba(200,30,74,0) 68%)",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.16)",
              backgroundColor: "rgba(255,61,36,0.18)",
              color: "#fdf0e7",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#fdf0e7", fontSize: 24, fontWeight: 600 }}>
              {personalInfo.fullName}
            </div>
            <div
              style={{
                color: "#a08575",
                fontSize: 15,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Portfolio
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#ffb020",
              fontSize: 17,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 46,
                height: 1,
                backgroundColor: "#ff3d24",
                display: "flex",
              }}
            />
            Full Stack Web Developer
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3.5,
              lineHeight: 1,
              color: "#fdf0e7",
            }}
          >
            <span>Building smart,</span>
            <span style={{ color: "#ffc98a" }}>scalable software.</span>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: 26,
          }}
        >
          <div style={{ color: "#d9b8a8", fontSize: 21 }}>
            {personalInfo.role}
          </div>
          <div style={{ color: "#8f7365", fontSize: 19 }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
