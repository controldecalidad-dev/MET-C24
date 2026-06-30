"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { Integraciones } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const FACILIDAD = [
  { value: "muy_facil", label: "Muy fácil — API REST bien documentada" },
  { value: "facil", label: "Fácil — con algo de configuración" },
  { value: "moderada", label: "Moderada — requiere desarrollo" },
  { value: "dificil", label: "Difícil — integración compleja" },
  { value: "sin_api", label: "Sin API disponible" },
];

interface Props {
  data: Integraciones;
  onChange: (data: Integraciones) => void;
}

export function SecIntegraciones({ data, onChange }: Props) {
  const set = (key: keyof Integraciones) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoTexto
          label="API disponible"
          placeholder="REST, SOAP, SDK... ¿qué endpoints ofrece?"
          value={data.apiDisponible}
          onChange={set("apiDisponible")}
        />
        <CampoTexto
          label="Sistemas compatibles"
          placeholder="VMS, PSIM, ERP, CRMs, etc."
          value={data.sistemasCompatibles}
          onChange={set("sistemasCompatibles")}
        />
        <CampoTexto
          label="Formatos de datos"
          placeholder="JSON, XML, ONVIF, webhooks..."
          value={data.formatosDatos}
          onChange={set("formatosDatos")}
        />
        <CampoSelect
          label="Facilidad de integración"
          options={FACILIDAD}
          value={data.facilidadIntegracion}
          onChange={set("facilidadIntegracion")}
        />
        <div className="md:col-span-2">
          <CampoTexto
            label="Notas adicionales"
            placeholder="Observaciones sobre integraciones..."
            value={data.notas}
            onChange={set("notas")}
          />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Integraciones"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.integracion}
        />
      </div>
    </div>
  );
}
