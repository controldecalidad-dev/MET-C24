"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { storage } from "@/lib/storage";
import { useEvaluaciones } from "@/hooks/useEvaluaciones";
import { FormularioEvaluacion } from "@/components/evaluacion/FormularioEvaluacion";
import type { Evaluacion } from "@/lib/types";

export default function EditarEvaluacionPage() {
  const params = useParams();
  const router = useRouter();
  const { guardar } = useEvaluaciones();
  const [ev, setEv] = useState<Evaluacion | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    storage.getById(params.id as string).then((data) => {
      setEv(data);
      setCargando(false);
    });
  }, [params.id]);

  const handleGuardar = async (updated: Evaluacion) => {
    setGuardando(true);
    await guardar(updated);
    setGuardando(false);
    router.push(`/evaluaciones/${updated.id}`);
  };

  if (cargando) return <div className="text-center py-16 text-gray-400">Cargando...</div>;
  if (!ev) return (
    <div className="text-center py-16">
      <p className="text-gray-500">Evaluación no encontrada</p>
      <Link href="/evaluaciones" className="text-red-600 text-sm mt-2 inline-block">Volver</Link>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <nav className="text-sm text-gray-500 mb-2">
          <Link href="/evaluaciones" className="hover:text-gray-700">Evaluaciones</Link>
          <span className="mx-2">/</span>
          <Link href={`/evaluaciones/${ev.id}`} className="hover:text-gray-700">{ev.infoGeneral.nombreSolucion || "Detalle"}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Editar</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Editar evaluación</h1>
      </div>
      <FormularioEvaluacion inicial={ev} onGuardar={handleGuardar} guardando={guardando} />
    </div>
  );
}
