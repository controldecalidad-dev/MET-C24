import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1x1 transparent GIF
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("c");
  const contactId = searchParams.get("u");

  if (campaignId && contactId && contactId !== "preview") {
    try {
      await prisma.event.create({
        data: {
          campaignId,
          contactId,
          type: "open",
          userAgent: req.headers.get("user-agent") ?? undefined,
          ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? undefined,
        },
      });
    } catch {
      // @@unique constraint — apertura duplicada, la ignoramos silenciosamente
    }
  }

  return new NextResponse(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
    },
  });
}
