import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          borderRadius: 64,
          background: "#fff",
          color: "#000",
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        RU
      </div>
    ),
    size,
  );
}
