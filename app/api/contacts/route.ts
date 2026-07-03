import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 50;

  const where = {
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { email: { contains: q, mode: "insensitive" as const } },
        { company: { contains: q, mode: "insensitive" as const } },
      ],
    }),
    ...(status && { status }),
  };

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: { select: { sends: true, events: true } },
      },
    }),
    prisma.contact.count({ where }),
  ]);

  return NextResponse.json({ contacts, total, page });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, company, origin, status } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "name y email son requeridos" }, { status: 400 });
  }

  const contact = await prisma.contact.create({
    data: { name, email, phone, company, origin, status: status ?? "active" },
  });

  return NextResponse.json(contact, { status: 201 });
}
