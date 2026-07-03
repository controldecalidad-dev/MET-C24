import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui";
import { ContactForm } from "@/components/contacts/ContactForm";

export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) notFound();

  return (
    <div className="space-y-6">
      <div>
        <nav className="text-sm text-gray-500 mb-1">
          <Link href="/contacts" className="hover:text-gray-700">Contactos</Link>
          <span className="mx-2">/</span>
          <Link href={`/contacts/${id}`} className="hover:text-gray-700">{contact.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Editar</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Editar contacto</h1>
      </div>
      <Card className="p-6">
        <ContactForm initial={{
          ...contact,
          phone: contact.phone ?? undefined,
          company: contact.company ?? undefined,
          origin: contact.origin ?? undefined,
        }} />
      </Card>
    </div>
  );
}
