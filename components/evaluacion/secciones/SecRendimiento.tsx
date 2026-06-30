"use client";

import { CampoTexto } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { Rendimiento } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

interface Props {
  data: Rendimiento;
  onChange: (data: Rendimiento) => void;
}

export function SecRendimiento({ data, onChange }: Props) {
  const set = (key: keyof Rendimiento) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoTexto
          label="Velocidad de procesamiento"
          placeholder="FPS, tiempo de detección, latencia de alerta..."
          value={data.velocidadProcesamiento}
          onChange={set("velocidadProcesamiento")}
        />
        <CampoTexto
          label="Disponibilidad (uptime)"
          placeholder="SLA garantizado, histórico de uptime..."
          value={data.disponibilidad}
          onChange={set("disponibilidad")}
        />
        <CampoTexto
          label="Latencia de respuesta"
          placeholder="Tiempo entre evento y alerta al operador..."
          value={data.latencia}
          onChange={set("latencia")}
        />
        <CampoTexto
          label="Consumo de recursos"
          placeholder="CPU, RAM, ancho de banda requerido..."
          value={data.consumoRecursos}
          onChange={set("consumoRecursos")}
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
          label="Puntaje — Rendimiento"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.rendimiento}
        />
      </div>
    </div>
  );
}
