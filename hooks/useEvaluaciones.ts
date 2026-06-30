"use client";

import { useState, useEffect, useCallback } from "react";
import type { Evaluacion } from "@/lib/types";
import { storage } from "@/lib/storage";
import { calcularPuntaje } from "@/lib/scoring";
import { nuevaEvaluacion } from "@/lib/defaults";

export function useEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargar = useCallback(async () => {
    setCargando(true);
    const data = await storage.getAll();
    setEvaluaciones(data.sort((a, b) => b.puntajeFinal - a.puntajeFinal));
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const guardar = useCallback(async (evaluacion: Evaluacion) => {
    const puntaje = calcularPuntaje(evaluacion);
    const actualizada = {
      ...evaluacion,
      puntajeFinal: puntaje,
      actualizadoEn: new Date().toISOString(),
    };
    await storage.save(actualizada);
    await cargar();
    return actualizada;
  }, [cargar]);

  const eliminar = useCallback(async (id: string) => {
    await storage.delete(id);
    await cargar();
  }, [cargar]);

  const crear = useCallback(() => {
    const id = `eval_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    return nuevaEvaluacion(id);
  }, []);

  return { evaluaciones, cargando, guardar, eliminar, crear, cargar };
}
