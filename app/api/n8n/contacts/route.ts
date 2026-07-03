import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { injectTracking } from "@/lib/tracking";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaignId");

  if (!campaignId) {
    return NextResponse.json({ error: "campaignId requerido" }, { status: 400 });
  }

  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) return NextResponse.json({ error: "Campaña no encontrada" }, { status: 404 });

  // Devolver solo contactos activos que aún no recibieron esta campaña
  const alreadySent = await prisma.send.findMany({
    where: { campaignId },
    select: { contactId: true },
  });
  const alreadySentIds = new Set(alreadySent.map((s: { contactId: string }) => s.contactId));

  const contacts = await prisma.contact.findMany({
    where: { status: "active" },
  });

  const pending = contacts.filter((c) => !alreadySentIds.has(c.id));

  const result = pending.map((c) => ({
    contactId: c.id,
    name: c.name,
    email: c.email,
    subject: campaign.subject,
    html: injectTracking(campaign.html, campaignId, c.id),
  }));

  return NextResponse.json({ campaign: campaign.name, total: result.length, contacts: result });
}
