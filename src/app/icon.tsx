import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          background:
            process.env.NODE_ENV === "development" ? "white" : "transparent",
          borderRadius: "5px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0-4.418-4.03-8-9-8a9.863 9.863 0 01-4.255.949L3 20l1.395-3.72C3.512 15.042 3 13.1 3 8c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
