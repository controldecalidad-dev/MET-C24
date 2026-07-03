"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select, Button, Card } from "@/components/ui";

const STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "scheduled", label: "Programada" },
  { value: "sent", label: "Enviada" },
];

interface Props {
  initial?: {
    id?: string;
    name?: string;
    subject?: string;
    html?: string;
    status?: string;
  };
}

export function CampaignForm({ initial = {} }: Props) {
  const router = useRouter();
  const isEdit = !!initial.id;

  const [form, setForm] = useState({
    name: initial.name ?? "",
    subject: initial.subject ?? "",
    html: initial.html ?? "",
    status: initial.status ?? "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.subject || !form.html) { setError("Todos los campos son requeridos"); return; }
    setSaving(true);
    setError("");

    const res = await fetch(isEdit ? `/api/campaigns/${initial.id}` : "/api/campaigns", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/campaigns");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al guardar");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <Input label="Nombre interno *" value={form.name} onChange={set("name")} placeholder="Campaña Julio 2025" />
        <Select label="Estado" options={STATUS_OPTIONS} value={form.status} onChange={set("status")} />
        <div className="sm:col-span-2">
          <Input label="Asunto del email *" value={form.subject} onChange={set("subject")} placeholder="¡Novedades de julio para vos!" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">HTML del correo *</label>
          <button type="button" onClick={() => setPreview(!preview)} className="text-xs text-indigo-600 hover:text-indigo-800">
            {preview ? "← Editar" : "Vista previa →"}
          </button>
        </div>
        {preview ? (
          <Card className="h-[500px] overflow-auto">
            <iframe srcDoc={form.html} className="w-full h-full border-0 rounded-xl" sandbox="allow-same-origin" title="preview" />
          </Card>
        ) : (
          <Textarea
            value={form.html}
            onChange={set("html")}
            placeholder="<!DOCTYPE html><html>..."
            rows={18}
            className="font-mono text-xs"
          />
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear campaña"}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancelar</Button>
      </div>
    </form>
  );
}
