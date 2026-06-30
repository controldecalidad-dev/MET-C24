"use client";

import Link from "next/link";
import type { Evaluacion } from "@/lib/types";
import { PuntajeCirculo } from "@/components/ui/PuntajeCirculo";
import { BadgeRecomendacion } from "@/components/ui/Badge";
import { PESOS } from "@/lib/scoring";

interface Props {
  evaluaciones: Evaluacion[];
}

const DIMS = [
  { key: "implementacion", label: "Impl.", get: (e: Evaluacion) => e.implementacion.puntaje },
  { key: "ia", label: "IA", get: (e: Evaluacion) => e.ia.puntaje },
  { key: "experienciaUso", label: "UX", get: (e: Evaluacion) => e.experienciaUso.puntaje },
  { key: "rendimiento", label: "Rend.", get: (e: Evaluacion) => e.rendimiento.puntaje },
  { key: "seguridad", label: "Seg.", get: (e: Evaluacion) => e.seguridad.puntaje },
  { key: "soporte", label: "Sop.", get: (e: Evaluacion) => e.soporte.puntaje },
  { key: "resultadoPiloto", label: "Piloto", get: (e: Evaluacion) => e.resultadoPiloto.puntaje },
] as const;

export function RankingComparativo({ evaluaciones }: Props) {
  if (evaluaciones.length < 2) return null;

  const maxPuntaje = Math.max(...evaluaciones.map((e) => e.puntajeFinal));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Ranking comparativo</h2>
        <p className="text-sm text-gray-500 mt-0.5">Ordenado de mayor a menor puntaje</p>
      </div>
      <div className="divide-y divide-gray-100">
        {evaluaciones.map((ev, i) => (
          <Link
            key={ev.id}
            href={`/evaluaciones/${ev.id}`}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 text-center">
              {i === 0 ? (
                <span className="text-lg">🥇</span>
              ) : i === 1 ? (
                <span className="text-lg">🥈</span>
              ) : i === 2 ? (
                <span className="text-lg">🥉</span>
              ) : (
                <span className="text-sm font-bold text-gray-400">{i + 1}</span>
              )}
            </div>

            <PuntajeCirculo puntaje={ev.puntajeFinal} size="sm" />

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{ev.infoGeneral.nombreSolucion || "Sin nombre"}</p>
              <p className="text-xs text-gray-500 truncate">{ev.infoGeneral.proveedor}</p>

              {/* Barras por dimensión */}
              <div className="mt-2 grid grid-cols-7 gap-1">
                {DIMS.map((dim) => {
                  const val = dim.get(ev);
                  return (
                    <div key={dim.key} className="text-center">
                      <div className="h-8 flex items-end">
                        <div
                          className={`w-full rounded-t transition-all ${
                            val >= 8 ? "bg-green-400" : val >= 6 ? "bg-yellow-400" : "bg-red-400"
                          }`}
                          style={{ height: `${(val / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{dim.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-right shrink-0">
              <BadgeRecomendacion value={ev.evaluacionFinal.recomendacion} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
