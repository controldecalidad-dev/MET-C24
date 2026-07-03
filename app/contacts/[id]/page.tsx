import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, Badge, Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      sends: {
        include: { campaign: { select: { id: true, name: true, status: true } } },
        orderBy: { sentAt: "desc" },
      },
      events: { orderBy: { createdAt: "desc" }, take: 50 },
    },
  });

  if (!contact) notFound();

  const opens = contact.events.filter((e) => e.type === "open").length;
  const clicks = contact.events.filter((e) => e.type === "click").length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            <Link href="/contacts" className="hover:text-gray-700">Contactos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{contact.name}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{contact.email}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link href={`/contacts/${id}/edit`}><Button variant="secondary">Editar</Button></Link>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Estado", value: <Badge value={contact.status} /> },
          { label: "Empresa", value: contact.company ?? "—" },
          { label: "Teléfono", value: contact.phone ?? "—" },
          { label: "Origen", value: contact.origin ?? "—" },
        ].map((item) => (
          <Card key={item.label} className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{item.label}</p>
            <div className="text-sm font-medium text-gray-800">{item.value}</div>
          </Card>
        ))}
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">{contact.sends.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Campañas recibidas</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{opens}</p>
          <p className="text-xs text-gray-500 mt-0.5">Aperturas</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{clicks}</p>
          <p className="text-xs text-gray-500 mt-0.5">Clicks</p>
        </Card>
      </div>

      {/* Timeline de eventos */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Actividad reciente</h2>
        {contact.events.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Sin actividad registrada</p>
        ) : (
          <div className="space-y-2">
            {contact.events.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <Badge value={ev.type} />
                {ev.target && <Badge value={ev.target} />}
                <span className="text-xs text-gray-400 flex-1 truncate">{ev.url ?? ""}</span>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(ev.createdAt).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Campañas recibidas */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Campañas recibidas</h2>
        {contact.sends.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Sin envíos registrados</p>
        ) : (
          <div className="space-y-2">
            {contact.sends.map((s) => (
              <div key={s.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <Link href={`/campaigns/${s.campaign.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600 flex-1 truncate">
                  {s.campaign.name}
                </Link>
                <Badge value={s.campaign.status} />
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(s.sentAt).toLocaleDateString("es-AR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
