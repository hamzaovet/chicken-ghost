import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Direct link to the genuine release v1.0.0 APK on GitHub Releases
  const downloadUrl =
    process.env.APK_DOWNLOAD_URL ||
    "https://github.com/hamzaovet/chicken-ghost/releases/download/v1.0.0/chicken-ghost.apk";

  return NextResponse.redirect(downloadUrl, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": 'attachment; filename="chicken-ghost.apk"',
    },
  });
}
