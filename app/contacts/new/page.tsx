import { Card } from "@/components/ui";
import { ContactForm } from "@/components/contacts/ContactForm";

export default function NewContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo contacto</h1>
        <p className="text-sm text-gray-500 mt-0.5">Completá los datos del contacto</p>
      </div>
      <Card className="p-6">
        <ContactForm />
      </Card>
    </div>
  );
}
