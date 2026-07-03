import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, Badge, Button, Empty } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { sends: true, events: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campañas</h1>
          <p className="text-sm text-gray-500 mt-0.5">{campaigns.length} campaña{campaigns.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/campaigns/new"><Button>+ Nueva campaña</Button></Link>
      </div>

      {campaigns.length === 0 ? (
        <Card className="p-6"><Empty message="Sin campañas creadas aún" /></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((c) => (
            <Card key={c.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <Link href={`/campaigns/${c.id}`} className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors block truncate">
                    {c.name}
                  </Link>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{c.subject}</p>
                </div>
                <Badge value={c.status} />
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span>📤 {c._count.sends} enviados</span>
                <span>⚡ {c._count.events} eventos</span>
              </div>

              {c.sentAt && (
                <p className="text-xs text-gray-400 mb-3">
                  Enviada el {new Date(c.sentAt).toLocaleDateString("es-AR")}
                </p>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link href={`/campaigns/${c.id}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                  Ver detalle →
                </Link>
                <span className="text-gray-300">|</span>
                <Link href={`/campaigns/${c.id}/edit`} className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                  Editar
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
