import { NextRequest, NextResponse } from "next/server";
import { getCampaignStats } from "@/lib/stats";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stats = await getCampaignStats(id);
  return NextResponse.json(stats);
}
