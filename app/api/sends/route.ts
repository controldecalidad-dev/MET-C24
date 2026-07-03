import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const campaignId = new URL(req.url).searchParams.get("campaignId");
  if (!campaignId) return NextResponse.json({ error: "campaignId requerido" }, { status: 400 });

  const sends = await prisma.send.findMany({
    where: { campaignId },
    include: { contact: { select: { id: true, name: true, email: true } } },
    orderBy: { sentAt: "desc" },
  });

  return NextResponse.json(sends);
}
