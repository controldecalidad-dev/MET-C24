"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface Props {
  titulo: string;
  descripcion?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  puntaje?: number;
}

export function SeccionFormulario({ titulo, descripcion, children, defaultOpen = false, puntaje }: Props) {
  const [abierta, setAbierta] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setAbierta(!abierta)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="text-base font-semibold text-gray-900">{titulo}</h3>
          {descripcion && <p className="text-sm text-gray-500 mt-0.5">{descripcion}</p>}
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          {puntaje !== undefined && (
            <span
              className={`text-sm font-bold px-2 py-0.5 rounded ${
                puntaje >= 8
                  ? "bg-green-100 text-green-700"
                  : puntaje >= 6
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {puntaje}/10
            </span>
          )}
          {abierta ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      {abierta && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4 space-y-4">{children}</div>
        </div>
      )}
    </div>
  );
}
