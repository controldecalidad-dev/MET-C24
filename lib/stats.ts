import { prisma } from "./prisma";

export async function getCampaignStats(campaignId: string) {
  const [totalSent, opens, clicks] = await Promise.all([
    prisma.send.count({ where: { campaignId } }),
    prisma.event.findMany({
      where: { campaignId, type: "open" },
      select: { contactId: true },
    }),
    prisma.event.findMany({
      where: { campaignId, type: "click" },
      select: { contactId: true, target: true, url: true },
    }),
  ]);

  const uniqueOpens = new Set(opens.map((e) => e.contactId)).size;
  const uniqueClicks = new Set(clicks.map((e) => e.contactId)).size;

  const clicksByTarget = clicks.reduce<Record<string, number>>((acc, e) => {
    const key = e.target ?? "link";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return {
    totalSent,
    uniqueOpens,
    uniqueClicks,
    openRate: totalSent > 0 ? Math.round((uniqueOpens / totalSent) * 100) : 0,
    clickRate: totalSent > 0 ? Math.round((uniqueClicks / totalSent) * 100) : 0,
    clicksByTarget,
  };
}

export async function getGlobalStats() {
  const [totalSent, totalOpens, totalClicks] = await Promise.all([
    prisma.send.count(),
    prisma.event.count({ where: { type: "open" } }),
    prisma.event.count({ where: { type: "click" } }),
  ]);

  return { totalSent, totalOpens, totalClicks };
}

export async function getTopContacts(limit = 10) {
  const contacts = await prisma.contact.findMany({
    include: {
      events: { select: { type: true } },
      sends: { select: { id: true } },
    },
    take: 100,
  });

  return contacts
    .map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      opens: c.events.filter((e) => e.type === "open").length,
      clicks: c.events.filter((e) => e.type === "click").length,
      sends: c.sends.length,
    }))
    .sort((a, b) => b.opens + b.clicks * 2 - (a.opens + a.clicks * 2))
    .slice(0, limit);
}
