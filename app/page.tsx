import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getGlobalStats, getTopContacts } from "@/lib/stats";
import { StatCard, Card, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, topContacts, recentCampaigns] = await Promise.all([
    getGlobalStats(),
    getTopContacts(8),
    prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { sends: true, events: true } } },
    }),
  ]);

  const openRate = stats.totalSent > 0 ? Math.round((stats.totalOpens / stats.totalSent) * 100) : 0;
  const clickRate = stats.totalSent > 0 ? Math.round((stats.totalClicks / stats.totalSent) * 100) : 0;

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Métricas globales de todas las campañas</p>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Total enviados" value={stats.totalSent.toLocaleString()} color="indigo" />
        <StatCard label="Aperturas únicas" value={stats.totalOpens.toLocaleString()} color="green" />
        <StatCard label="Clicks únicos" value={stats.totalClicks.toLocaleString()} color="orange" />
        <StatCard label="Tasa apertura" value={`${openRate}%`} color="green" />
        <StatCard label="Tasa clicks" value={`${clickRate}%`} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top contactos */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Top contactos más interesados</h2>
            <Link href="/contacts" className="text-xs text-indigo-600 hover:text-indigo-800">Ver todos →</Link>
          </div>
          {topContacts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Sin datos aún</p>
          ) : (
            <div className="space-y-2">
              {topContacts.map((c, i) => (
                <Link
                  key={c.id}
                  href={`/contacts/${c.id}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400 truncate">{c.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      {c.opens} opens
                    </span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                      {c.clicks} clicks
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Campañas recientes */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Campañas recientes</h2>
            <Link href="/campaigns" className="text-xs text-indigo-600 hover:text-indigo-800">Ver todas →</Link>
          </div>
          {recentCampaigns.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Sin campañas aún</p>
          ) : (
            <div className="space-y-2">
              {recentCampaigns.map((c) => (
                <Link
                  key={c.id}
                  href={`/campaigns/${c.id}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400">
                      {c._count.sends} enviados · {c._count.events} eventos
                    </p>
                  </div>
                  <Badge value={c.status} />
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
