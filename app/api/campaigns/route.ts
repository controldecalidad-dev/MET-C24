import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { sends: true, events: true } },
    },
  });
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, subject, html } = body;

  if (!name || !subject || !html) {
    return NextResponse.json({ error: "name, subject y html son requeridos" }, { status: 400 });
  }

  const campaign = await prisma.campaign.create({
    data: { name, subject, html },
  });

  return NextResponse.json(campaign, { status: 201 });
}
