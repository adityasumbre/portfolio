import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/personalInfo";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

/** Generated favicon: the AS monogram on the brand gradient. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #150a08 0%, #3a130a 55%, #080403 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,61,36,0.65), rgba(255,61,36,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 176,
            height: 176,
            borderRadius: 44,
            border: "2px solid rgba(255,176,32,0.45)",
            color: "#fdf0e7",
            fontSize: 74,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          {siteConfig.initials}
        </div>
      </div>
    ),
    { ...size },
  );
}
