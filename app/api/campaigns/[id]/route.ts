import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      sends: {
        include: { contact: { select: { id: true, name: true, email: true } } },
        orderBy: { sentAt: "desc" },
      },
      _count: { select: { sends: true, events: true } },
    },
  });

  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { name, subject, html, status, sentAt } = body;

  const campaign = await prisma.campaign.update({
    where: { id },
    data: { name, subject, html, status, sentAt: sentAt ? new Date(sentAt) : undefined },
  });

  return NextResponse.json(campaign);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.campaign.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
