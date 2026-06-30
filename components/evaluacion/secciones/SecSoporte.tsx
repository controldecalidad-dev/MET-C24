"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { Soporte } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const TIPO_SOPORTE = [
  { value: "24_7", label: "24/7 dedicado" },
  { value: "horario_comercial", label: "Horario comercial" },
  { value: "tickets", label: "Solo tickets / email" },
  { value: "comunidad", label: "Solo comunidad" },
  { value: "sin_soporte", label: "Sin soporte formal" },
];

interface Props {
  data: Soporte;
  onChange: (data: Soporte) => void;
}

export function SecSoporte({ data, onChange }: Props) {
  const set = (key: keyof Soporte) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoSelect
          label="Tipo de soporte"
          options={TIPO_SOPORTE}
          value={data.tipoSoporte}
          onChange={set("tipoSoporte")}
        />
        <CampoTexto
          label="Horario de atención"
          placeholder="ej. Lunes a viernes 9-18hs (GMT-3)"
          value={data.horarioAtencion}
          onChange={set("horarioAtencion")}
        />
        <CampoTexto
          label="Tiempo de respuesta SLA"
          placeholder="ej. Crítico: 1h, Alta: 4h, Media: 24h"
          value={data.tiempoRespuesta}
          onChange={set("tiempoRespuesta")}
        />
        <CampoTexto
          label="Comunidad / documentación"
          placeholder="Foros, base de conocimiento, videos tutoriales..."
          value={data.comunidad}
          onChange={set("comunidad")}
        />
        <div className="md:col-span-2">
          <CampoTexto
            label="Notas adicionales"
            value={data.notas}
            onChange={set("notas")}
          />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Soporte"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.soporte}
        />
      </div>
    </div>
  );
}
