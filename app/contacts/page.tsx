import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, Badge, Button, Empty } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;

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
      take: 100,
      include: { _count: { select: { sends: true, events: true } } },
    }),
    prisma.contact.count({ where }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} contacto{total !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/contacts/new">
          <Button>+ Nuevo contacto</Button>
        </Link>
      </div>

      {/* Filtros */}
      <form className="flex gap-3 flex-wrap">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre, email o empresa..."
          className="flex-1 min-w-[200px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="unsubscribed">Desuscriptos</option>
          <option value="bounced">Rebotados</option>
        </select>
        <Button type="submit" variant="secondary">Filtrar</Button>
      </form>

      <Card>
        {contacts.length === 0 ? (
          <Empty message="Sin contactos que coincidan" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Empresa</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Origen</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Envíos</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Eventos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">
                      <Link href={`/contacts/${c.id}`} className="hover:text-indigo-600 transition-colors">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{c.email}</td>
                    <td className="px-5 py-3 text-gray-500">{c.company ?? "—"}</td>
                    <td className="px-5 py-3"><Badge value={c.status} /></td>
                    <td className="px-5 py-3 text-gray-500">{c.origin ?? "—"}</td>
                    <td className="px-5 py-3 text-center text-gray-600">{c._count.sends}</td>
                    <td className="px-5 py-3 text-center text-gray-600">{c._count.events}</td>
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
