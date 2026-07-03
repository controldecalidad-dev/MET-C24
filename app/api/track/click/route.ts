import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("c");
  const contactId = searchParams.get("u");
  const target = searchParams.get("t") ?? "link";
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "url requerida" }, { status: 400 });

  const destination = decodeURIComponent(url);

  if (campaignId && contactId && contactId !== "preview") {
    try {
      await prisma.event.create({
        data: {
          campaignId,
          contactId,
          type: "click",
          target,
          url: destination,
          userAgent: req.headers.get("user-agent") ?? undefined,
          ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? undefined,
        },
      });
    } catch {
      // clicks duplicados permitidos — no tiene @@unique
    }
  }

  return NextResponse.redirect(destination, 302);
}
