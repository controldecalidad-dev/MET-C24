import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, Badge, Button } from "@/components/ui";
import { CampaignStats } from "@/components/campaigns/CampaignStats";

export const dynamic = "force-dynamic";

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      sends: {
        include: { contact: { select: { id: true, name: true, email: true } } },
        orderBy: { sentAt: "desc" },
        take: 100,
      },
      events: { select: { contactId: true, type: true } },
    },
  });

  if (!campaign) notFound();

  // Enriquecer sends con open/click info
  const openSet = new Set(campaign.events.filter((e) => e.type === "open").map((e) => e.contactId));
  const clickSet = new Set(campaign.events.filter((e) => e.type === "click").map((e) => e.contactId));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            <Link href="/campaigns" className="hover:text-gray-700">Campañas</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{campaign.name}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{campaign.subject}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge value={campaign.status} />
          <Link href={`/campaigns/${id}/edit`}><Button variant="secondary">Editar</Button></Link>
        </div>
      </div>

      {/* Stats de esta campaña */}
      <CampaignStats campaignId={id} />

      {/* Integración n8n */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Integración con n8n</h2>
        <div className="space-y-2">
          {[
            { label: "Obtener contactos con HTML trackeado", url: `/api/n8n/contacts?campaignId=${id}` },
            { label: "Preview HTML (contacto de prueba)", url: `/api/campaigns/${id}/html?u=preview` },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-48 shrink-0">{item.label}</span>
              <code className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 flex-1 truncate text-indigo-700">
                GET {item.url}
              </code>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabla de envíos */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Envíos ({campaign.sends.length})
        </h2>
        {campaign.sends.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Sin envíos registrados aún</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contacto</th>
                  <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</th>
                  <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Apertura</th>
                  <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Click</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {campaign.sends.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 pr-4 font-medium text-gray-900">
                      <Link href={`/contacts/${s.contact.id}`} className="hover:text-indigo-600">
                        {s.contact.name}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 text-gray-500">{s.contact.email}</td>
                    <td className="py-2 pr-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(s.sentAt).toLocaleDateString("es-AR")}
                    </td>
                    <td className="py-2 pr-4 text-center">
                      {openSet.has(s.contact.id) ? "✅" : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="py-2 text-center">
                      {clickSet.has(s.contact.id) ? "🖱️" : <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
