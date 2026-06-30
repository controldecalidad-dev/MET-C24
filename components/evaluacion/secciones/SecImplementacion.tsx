"use client";

import { Campo, CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { Implementacion } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const COMPLEJIDAD = [
  { value: "baja", label: "Baja — plug & play" },
  { value: "media", label: "Media — requiere configuración" },
  { value: "alta", label: "Alta — implica desarrollo" },
  { value: "muy_alta", label: "Muy alta — integración compleja" },
];

interface Props {
  data: Implementacion;
  onChange: (data: Implementacion) => void;
}

export function SecImplementacion({ data, onChange }: Props) {
  const set = (key: keyof Implementacion) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Campo
          label="Tiempo estimado de despliegue"
          placeholder="ej. 2-3 semanas"
          value={data.tiempoDespliegue}
          onChange={set("tiempoDespliegue")}
        />
        <CampoSelect
          label="Complejidad de instalación"
          options={COMPLEJIDAD}
          value={data.complejidadInstalacion}
          onChange={set("complejidadInstalacion")}
        />
        <CampoTexto
          label="Requisitos técnicos"
          placeholder="Hardware, SO, ancho de banda, etc."
          value={data.requisitosTecnicos}
          onChange={set("requisitosTecnicos")}
        />
        <CampoTexto
          label="Documentación disponible"
          placeholder="¿Qué documentación provee? ¿Es clara y completa?"
          value={data.documentacion}
          onChange={set("documentacion")}
        />
        <CampoTexto
          label="Capacitación requerida"
          placeholder="Horas estimadas, tipo de capacitación..."
          value={data.capacitacionRequerida}
          onChange={set("capacitacionRequerida")}
        />
        <CampoTexto
          label="Notas adicionales"
          placeholder="Observaciones relevantes..."
          value={data.notas}
          onChange={set("notas")}
        />
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Implementación"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.implementacion}
        />
      </div>
    </div>
  );
}
