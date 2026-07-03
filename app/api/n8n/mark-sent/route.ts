import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface SendItem {
  campaignId: string;
  contactId: string;
  email: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sends } = body as { sends: SendItem[] };

  if (!Array.isArray(sends) || sends.length === 0) {
    return NextResponse.json({ error: "sends[] requerido" }, { status: 400 });
  }

  const results = await Promise.allSettled(
    sends.map((s) =>
      prisma.send.upsert({
        where: { campaignId_contactId: { campaignId: s.campaignId, contactId: s.contactId } },
        create: { campaignId: s.campaignId, contactId: s.contactId, email: s.email },
        update: { sentAt: new Date() },
      })
    )
  );

  const ok = results.filter((r) => r.status === "fulfilled").length;

  // Marcar campaña como sent si aún no lo está
  if (sends[0]?.campaignId) {
    await prisma.campaign.updateMany({
      where: { id: sends[0].campaignId, status: { not: "sent" } },
      data: { status: "sent", sentAt: new Date() },
    });
  }

  return NextResponse.json({ ok, total: sends.length });
}
