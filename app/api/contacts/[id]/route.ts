import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      sends: { include: { campaign: { select: { id: true, name: true } } }, orderBy: { sentAt: "desc" } },
      events: { orderBy: { createdAt: "desc" }, take: 50 },
    },
  });

  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(contact);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { name, email, phone, company, origin, status } = body;

  const contact = await prisma.contact.update({
    where: { id },
    data: { name, email, phone, company, origin, status },
  });

  return NextResponse.json(contact);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.contact.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
