"use client";

import { CampoTexto } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { Escalabilidad } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

interface Props {
  data: Escalabilidad;
  onChange: (data: Escalabilidad) => void;
}

export function SecEscalabilidad({ data, onChange }: Props) {
  const set = (key: keyof Escalabilidad) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoTexto
          label="Capacidad de crecimiento"
          placeholder="¿Cuántas cámaras / usuarios / sitios puede manejar?"
          value={data.capacidadCrecimiento}
          onChange={set("capacidadCrecimiento")}
        />
        <CampoTexto
          label="Arquitectura"
          placeholder="Cloud, on-premise, híbrido, microservicios..."
          value={data.arquitectura}
          onChange={set("arquitectura")}
        />
        <CampoTexto
          label="Soporte multi-sede"
          placeholder="¿Permite gestionar múltiples ubicaciones? ¿Cómo?"
          value={data.multiSede}
          onChange={set("multiSede")}
        />
        <CampoTexto
          label="Notas adicionales"
          value={data.notas}
          onChange={set("notas")}
        />
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Escalabilidad"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.escalabilidad}
        />
      </div>
    </div>
  );
}
