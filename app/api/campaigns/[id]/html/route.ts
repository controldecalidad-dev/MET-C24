import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { injectTracking } from "@/lib/tracking";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contactId = new URL(req.url).searchParams.get("u") ?? "preview";

  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const html = injectTracking(campaign.html, id, contactId);
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
