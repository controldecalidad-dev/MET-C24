"use client";

import { CampoTexto } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { ResultadoPiloto } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

interface Props {
  data: ResultadoPiloto;
  onChange: (data: ResultadoPiloto) => void;
}

export function SecPiloto({ data, onChange }: Props) {
  const set = (key: keyof ResultadoPiloto) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoTexto
          label="Duración del piloto"
          placeholder="ej. 30 días, del 01/06 al 30/06/2025"
          value={data.duracionPiloto}
          onChange={set("duracionPiloto")}
        />
        <CampoTexto
          label="Métricas obtenidas"
          placeholder="Alertas procesadas, tiempo promedio de respuesta..."
          value={data.metricas}
          onChange={set("metricas")}
        />
        <CampoTexto
          label="Resultados obtenidos"
          placeholder="¿Qué resultados concretos se lograron durante el piloto?"
          value={data.resultadosObtenidos}
          onChange={set("resultadosObtenidos")}
        />
        <CampoTexto
          label="Incidentes detectados"
          placeholder="Problemas, caídas, errores encontrados..."
          value={data.incidentesDetectados}
          onChange={set("incidentesDetectados")}
        />
        <CampoTexto
          label="Satisfacción del equipo"
          placeholder="Feedback de operadores y supervisores..."
          value={data.satisfaccionEquipo}
          onChange={set("satisfaccionEquipo")}
        />
        <CampoTexto
          label="Notas adicionales"
          value={data.notas}
          onChange={set("notas")}
        />
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Resultado del piloto"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.resultadoPiloto}
        />
      </div>
    </div>
  );
}
