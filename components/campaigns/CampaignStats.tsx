"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui";
import { ClicksChart } from "@/components/dashboard/ClicksChart";
import { Card } from "@/components/ui";

interface Stats {
  totalSent: number;
  uniqueOpens: number;
  uniqueClicks: number;
  openRate: number;
  clickRate: number;
  clicksByTarget: Record<string, number>;
}

export function CampaignStats({ campaignId }: { campaignId: string }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`/api/campaigns/${campaignId}/stats`)
      .then((r) => r.json())
      .then(setStats);
  }, [campaignId]);

  if (!stats) return <p className="text-sm text-gray-400">Cargando stats...</p>;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard label="Enviados" value={stats.totalSent} color="indigo" />
        <StatCard label="Aperturas únicas" value={stats.uniqueOpens} color="green" />
        <StatCard label="Clicks únicos" value={stats.uniqueClicks} color="orange" />
        <StatCard label="Tasa apertura" value={`${stats.openRate}%`} color="green" />
        <StatCard label="Tasa clicks" value={`${stats.clickRate}%`} color="orange" />
      </div>

      {Object.keys(stats.clicksByTarget).length > 0 && (
        <Card className="p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Clicks por destino</p>
          <ClicksChart data={stats.clicksByTarget} />
        </Card>
      )}
    </div>
  );
}
