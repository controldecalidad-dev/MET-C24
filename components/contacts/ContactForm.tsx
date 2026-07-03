"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, Button } from "@/components/ui";

const STATUS_OPTIONS = [
  { value: "active", label: "Activo" },
  { value: "unsubscribed", label: "Desuscripto" },
  { value: "bounced", label: "Rebotado" },
];

const ORIGIN_OPTIONS = [
  { value: "", label: "Sin origen" },
  { value: "manual", label: "Manual" },
  { value: "formulario", label: "Formulario web" },
  { value: "importacion", label: "Importación CSV" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
];

interface Props {
  initial?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    origin?: string;
    status?: string;
  };
}

export function ContactForm({ initial = {} }: Props) {
  const router = useRouter();
  const isEdit = !!initial.id;

  const [form, setForm] = useState({
    name: initial.name ?? "",
    email: initial.email ?? "",
    phone: initial.phone ?? "",
    company: initial.company ?? "",
    origin: initial.origin ?? "",
    status: initial.status ?? "active",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Nombre y email son requeridos"); return; }
    setSaving(true);
    setError("");

    const res = await fetch(isEdit ? `/api/contacts/${initial.id}` : "/api/contacts", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/contacts");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al guardar");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Nombre *" value={form.name} onChange={set("name")} placeholder="Juan Pérez" />
        <Input label="Email *" type="email" value={form.email} onChange={set("email")} placeholder="juan@empresa.com" />
        <Input label="Teléfono" value={form.phone} onChange={set("phone")} placeholder="+54 9 11..." />
        <Input label="Empresa" value={form.company} onChange={set("company")} placeholder="Acme S.A." />
        <Select label="Origen" options={ORIGIN_OPTIONS} value={form.origin} onChange={set("origin")} />
        <Select label="Estado" options={STATUS_OPTIONS} value={form.status} onChange={set("status")} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>{saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear contacto"}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
