"use client";

import Link from "next/link";
import { useEvaluaciones } from "@/hooks/useEvaluaciones";
import { TablaEvaluaciones } from "@/components/resultados/TablaEvaluaciones";
import { RankingComparativo } from "@/components/resultados/RankingComparativo";

export default function EvaluacionesPage() {
  const { evaluaciones, cargando, eliminar } = useEvaluaciones();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluaciones</h1>
          <p className="text-sm text-gray-500 mt-1">
            {evaluaciones.length} evaluación{evaluaciones.length !== 1 ? "es" : ""} registrada{evaluaciones.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/evaluaciones/nueva"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          Nueva evaluación
        </Link>
      </div>

      {cargando ? (
        <div className="text-center py-16 text-gray-400">Cargando...</div>
      ) : (
        <>
          <RankingComparativo evaluaciones={evaluaciones} />

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Todas las evaluaciones</h2>
            <TablaEvaluaciones evaluaciones={evaluaciones} onEliminar={eliminar} />
          </div>
        </>
      )}
    </div>
  );
}
