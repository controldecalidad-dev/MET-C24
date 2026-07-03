import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui";
import { CampaignForm } from "@/components/campaigns/CampaignForm";

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) notFound();

  return (
    <div className="space-y-6">
      <div>
        <nav className="text-sm text-gray-500 mb-1">
          <Link href="/campaigns" className="hover:text-gray-700">Campañas</Link>
          <span className="mx-2">/</span>
          <Link href={`/campaigns/${id}`} className="hover:text-gray-700">{campaign.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Editar</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Editar campaña</h1>
      </div>
      <Card className="p-6">
        <CampaignForm initial={campaign} />
      </Card>
    </div>
  );
}
