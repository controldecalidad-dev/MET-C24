"use client";

import { PuntajeCirculo } from "@/components/ui/PuntajeCirculo";
import { PESOS } from "@/lib/scoring";
import type { Evaluacion } from "@/lib/types";

interface Props {
  evaluacion: Partial<Evaluacion>;
  puntajeFinal: number;
}

const CATEGORIAS = [
  { key: "implementacion", label: "Implementación", get: (e: Partial<Evaluacion>) => e.implementacion?.puntaje },
  { key: "integracion", label: "Integración", get: (e: Partial<Evaluacion>) => e.integraciones?.puntaje },
  { key: "ia", label: "IA", get: (e: Partial<Evaluacion>) => e.ia?.puntaje },
  { key: "experienciaUso", label: "Experiencia", get: (e: Partial<Evaluacion>) => e.experienciaUso?.puntaje },
  { key: "rendimiento", label: "Rendimiento", get: (e: Partial<Evaluacion>) => e.rendimiento?.puntaje },
  { key: "seguridad", label: "Seguridad", get: (e: Partial<Evaluacion>) => e.seguridad?.puntaje },
  { key: "escalabilidad", label: "Escalabilidad", get: (e: Partial<Evaluacion>) => e.escalabilidad?.puntaje },
  { key: "soporte", label: "Soporte", get: (e: Partial<Evaluacion>) => e.soporte?.puntaje },
  { key: "resultadoPiloto", label: "Piloto", get: (e: Partial<Evaluacion>) => e.resultadoPiloto?.puntaje },
  { key: "evaluacionFinal", label: "Eval. final", get: (e: Partial<Evaluacion>) => e.evaluacionFinal?.puntaje },
] as const;

export function PuntajeResumen({ evaluacion, puntajeFinal }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky top-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Puntaje final estimado</h3>
      <div className="flex justify-center mb-5">
        <PuntajeCirculo puntaje={puntajeFinal} size="lg" />
      </div>
      <div className="space-y-2">
        {CATEGORIAS.map((cat) => {
          const val = cat.get(evaluacion) ?? 0;
          const peso = PESOS[cat.key as keyof typeof PESOS];
          return (
            <div key={cat.key} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-24 shrink-0">{cat.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    val >= 8 ? "bg-green-500" : val >= 6 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${(val / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700 w-6 text-right tabular-nums">{val}</span>
              <span className="text-xs text-gray-400 w-8">×{peso}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
