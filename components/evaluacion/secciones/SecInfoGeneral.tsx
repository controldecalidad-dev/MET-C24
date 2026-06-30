"use client";

import { Campo, CampoSelect } from "@/components/ui/Campo";
import type { InfoGeneral } from "@/lib/types";

const CATEGORIAS = [
  { value: "videoverificacion", label: "Videoverificación con IA" },
  { value: "control_acceso", label: "Control de acceso" },
  { value: "monitoreo", label: "Monitoreo y vigilancia" },
  { value: "analitica", label: "Analítica de video" },
  { value: "gestion_incidentes", label: "Gestión de incidentes" },
  { value: "otro", label: "Otro" },
];

interface Props {
  data: InfoGeneral;
  onChange: (data: InfoGeneral) => void;
  errors?: Partial<Record<keyof InfoGeneral, string>>;
}

export function SecInfoGeneral({ data, onChange, errors }: Props) {
  const set = (key: keyof InfoGeneral) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Campo
        label="Nombre de la solución *"
        placeholder="ej. VeriAlert Pro"
        value={data.nombreSolucion}
        onChange={set("nombreSolucion")}
        error={errors?.nombreSolucion}
      />
      <Campo
        label="Proveedor *"
        placeholder="ej. TechSec S.A."
        value={data.proveedor}
        onChange={set("proveedor")}
        error={errors?.proveedor}
      />
      <Campo
        label="Versión"
        placeholder="ej. 3.2.1"
        value={data.version}
        onChange={set("version")}
      />
      <Campo
        label="Fecha de evaluación *"
        type="date"
        value={data.fechaEvaluacion}
        onChange={set("fechaEvaluacion")}
        error={errors?.fechaEvaluacion}
      />
      <Campo
        label="Evaluador *"
        placeholder="Nombre y apellido"
        value={data.evaluador}
        onChange={set("evaluador")}
        error={errors?.evaluador}
      />
      <CampoSelect
        label="Categoría"
        options={CATEGORIAS}
        value={data.categoria}
        onChange={set("categoria")}
      />
      <div className="md:col-span-2">
        <Campo
          label="Sitio web"
          type="url"
          placeholder="https://..."
          value={data.sitioWeb}
          onChange={set("sitioWeb")}
        />
      </div>
    </div>
  );
}
