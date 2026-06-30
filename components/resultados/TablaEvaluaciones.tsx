"use client";

import Link from "next/link";
import type { Evaluacion } from "@/lib/types";
import { BadgeRecomendacion, BadgeEstado } from "@/components/ui/Badge";
import { bgColorPuntaje } from "@/lib/scoring";

interface Props {
  evaluaciones: Evaluacion[];
  onEliminar: (id: string) => void;
}

export function TablaEvaluaciones({ evaluaciones, onEliminar }: Props) {
  if (evaluaciones.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No hay evaluaciones todavía</p>
        <p className="text-sm mt-1">Creá la primera usando el botón de arriba</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">#</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">Solución</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">Proveedor</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">Fecha</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">Evaluador</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap text-center">Puntaje</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">Recomendación</th>
            <th className="pb-3 pr-4 font-semibold text-gray-600 whitespace-nowrap">Estado</th>
            <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {evaluaciones.map((ev, i) => (
            <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 pr-4 text-gray-400 font-medium">{i + 1}</td>
              <td className="py-3 pr-4 font-semibold text-gray-900 max-w-[180px]">
                <Link href={`/evaluaciones/${ev.id}`} className="hover:text-red-600 transition-colors">
                  {ev.infoGeneral.nombreSolucion || <span className="text-gray-400 font-normal">Sin nombre</span>}
                </Link>
              </td>
              <td className="py-3 pr-4 text-gray-600">{ev.infoGeneral.proveedor || "—"}</td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">
                {ev.infoGeneral.fechaEvaluacion
                  ? new Date(ev.infoGeneral.fechaEvaluacion).toLocaleDateString("es-AR")
                  : "—"}
              </td>
              <td className="py-3 pr-4 text-gray-600">{ev.infoGeneral.evaluador || "—"}</td>
              <td className="py-3 pr-4 text-center">
                <span className={`inline-block px-2 py-1 rounded-lg text-sm font-bold ${bgColorPuntaje(ev.puntajeFinal)}`}>
                  {ev.puntajeFinal.toFixed(1)}
                </span>
              </td>
              <td className="py-3 pr-4">
                <BadgeRecomendacion value={ev.evaluacionFinal.recomendacion} />
              </td>
              <td className="py-3 pr-4">
                <BadgeEstado value={ev.estado} />
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/evaluaciones/${ev.id}`}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    href={`/evaluaciones/${ev.id}/editar`}
                    className="text-xs text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Editar
                  </Link>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar la evaluación de "${ev.infoGeneral.nombreSolucion}"?`)) {
                        onEliminar(ev.id);
                      }
                    }}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
