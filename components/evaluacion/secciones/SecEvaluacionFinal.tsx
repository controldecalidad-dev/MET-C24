"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { EvaluacionFinal, Recomendacion } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const RECOMENDACIONES = [
  { value: "Recomendado", label: "Recomendado — implementar" },
  { value: "Recomendado con reservas", label: "Recomendado con reservas — condicionado" },
  { value: "No recomendado", label: "No recomendado — descartar" },
  { value: "Pendiente", label: "Pendiente — requiere más información" },
];

interface Props {
  data: EvaluacionFinal;
  onChange: (data: EvaluacionFinal) => void;
}

export function SecEvaluacionFinal({ data, onChange }: Props) {
  const set = (key: keyof EvaluacionFinal) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <CampoTexto
          label="Resumen ejecutivo"
          placeholder="Síntesis de la evaluación en 3-5 líneas para presentar a dirección..."
          value={data.resumenEjecutivo}
          onChange={set("resumenEjecutivo")}
          rows={4}
        />
        <CampoSelect
          label="Recomendación final *"
          options={RECOMENDACIONES}
          value={data.recomendacion}
          onChange={(e) => onChange({ ...data, recomendacion: e.target.value as Recomendacion })}
        />
        <CampoTexto
          label="Condiciones de la recomendación"
          placeholder="¿Qué condiciones deben cumplirse? ej. Negociar SLA, integrar con X sistema..."
          value={data.condicionesRecomendacion}
          onChange={set("condicionesRecomendacion")}
        />
        <CampoTexto
          label="Próximos pasos"
          placeholder="Acciones concretas: negociación, PoC extendida, consulta legal..."
          value={data.proximosPasos}
          onChange={set("proximosPasos")}
        />
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Evaluación final"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.evaluacionFinal}
        />
      </div>
    </div>
  );
}
