"use client";

import { useState, useCallback } from "react";
import type { Evaluacion, Estado } from "@/lib/types";
import { calcularPuntaje } from "@/lib/scoring";
import { SeccionFormulario } from "./SeccionFormulario";
import { PuntajeResumen } from "./PuntajeResumen";
import { SecInfoGeneral } from "./secciones/SecInfoGeneral";
import { SecObjetivo } from "./secciones/SecObjetivo";
import { SecImplementacion } from "./secciones/SecImplementacion";
import { SecIntegraciones } from "./secciones/SecIntegraciones";
import { SecIA } from "./secciones/SecIA";
import { SecFuncionalidades } from "./secciones/SecFuncionalidades";
import { SecExperiencia } from "./secciones/SecExperiencia";
import { SecRendimiento } from "./secciones/SecRendimiento";
import { SecSeguridad } from "./secciones/SecSeguridad";
import { SecEscalabilidad } from "./secciones/SecEscalabilidad";
import { SecCostos } from "./secciones/SecCostos";
import { SecSoporte } from "./secciones/SecSoporte";
import { SecRiesgos } from "./secciones/SecRiesgos";
import { SecFortalezasDebilidades } from "./secciones/SecFortalezasDebilidades";
import { SecPiloto } from "./secciones/SecPiloto";
import { SecEvaluacionFinal } from "./secciones/SecEvaluacionFinal";

interface Props {
  inicial: Evaluacion;
  onGuardar: (e: Evaluacion) => Promise<void>;
  guardando?: boolean;
}

const ESTADOS: Estado[] = ["Borrador", "En evaluación", "Completado", "Archivado"];

function validar(e: Evaluacion): Record<string, string> {
  const err: Record<string, string> = {};
  if (!e.infoGeneral.nombreSolucion.trim()) err["nombreSolucion"] = "Requerido";
  if (!e.infoGeneral.proveedor.trim()) err["proveedor"] = "Requerido";
  if (!e.infoGeneral.evaluador.trim()) err["evaluador"] = "Requerido";
  if (!e.infoGeneral.fechaEvaluacion) err["fechaEvaluacion"] = "Requerido";
  return err;
}

export function FormularioEvaluacion({ inicial, onGuardar, guardando }: Props) {
  const [ev, setEv] = useState<Evaluacion>(inicial);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [guardadoOk, setGuardadoOk] = useState(false);

  const puntaje = calcularPuntaje(ev);

  const update = useCallback(<K extends keyof Evaluacion>(key: K, val: Evaluacion[K]) => {
    setEv((prev) => ({ ...prev, [key]: val }));
    setGuardadoOk(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validar(ev);
    if (Object.keys(errs).length > 0) {
      setErrores(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrores({});
    await onGuardar({ ...ev, puntajeFinal: puntaje });
    setGuardadoOk(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-4">
          {Object.keys(errores).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-700">Hay campos requeridos sin completar en Información general.</p>
            </div>
          )}

          <SeccionFormulario titulo="Información general" defaultOpen>
            <SecInfoGeneral
              data={ev.infoGeneral}
              onChange={(v) => update("infoGeneral", v)}
              errors={{
                nombreSolucion: errores.nombreSolucion,
                proveedor: errores.proveedor,
                evaluador: errores.evaluador,
                fechaEvaluacion: errores.fechaEvaluacion,
              }}
            />
          </SeccionFormulario>

          <SeccionFormulario titulo="Objetivo de la solución" descripcion="¿Qué problema resuelve y para quién?">
            <SecObjetivo data={ev.objetivo} onChange={(v) => update("objetivo", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Implementación" puntaje={ev.implementacion.puntaje}>
            <SecImplementacion data={ev.implementacion} onChange={(v) => update("implementacion", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Integraciones" puntaje={ev.integraciones.puntaje}>
            <SecIntegraciones data={ev.integraciones} onChange={(v) => update("integraciones", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Inteligencia Artificial" puntaje={ev.ia.puntaje}>
            <SecIA data={ev.ia} onChange={(v) => update("ia", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Funcionalidades">
            <SecFuncionalidades data={ev.funcionalidades} onChange={(v) => update("funcionalidades", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Experiencia de uso" puntaje={ev.experienciaUso.puntaje}>
            <SecExperiencia data={ev.experienciaUso} onChange={(v) => update("experienciaUso", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Rendimiento" puntaje={ev.rendimiento.puntaje}>
            <SecRendimiento data={ev.rendimiento} onChange={(v) => update("rendimiento", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Seguridad" puntaje={ev.seguridad.puntaje}>
            <SecSeguridad data={ev.seguridad} onChange={(v) => update("seguridad", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Escalabilidad" puntaje={ev.escalabilidad.puntaje}>
            <SecEscalabilidad data={ev.escalabilidad} onChange={(v) => update("escalabilidad", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Costos">
            <SecCostos data={ev.costos} onChange={(v) => update("costos", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Soporte" puntaje={ev.soporte.puntaje}>
            <SecSoporte data={ev.soporte} onChange={(v) => update("soporte", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Riesgos">
            <SecRiesgos data={ev.riesgos} onChange={(v) => update("riesgos", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Fortalezas y debilidades">
            <SecFortalezasDebilidades
              fortalezas={ev.fortalezas}
              debilidades={ev.debilidades}
              onChangeFortalezas={(v) => update("fortalezas", v)}
              onChangeDebilidades={(v) => update("debilidades", v)}
            />
          </SeccionFormulario>

          <SeccionFormulario titulo="Resultado del piloto" puntaje={ev.resultadoPiloto.puntaje}>
            <SecPiloto data={ev.resultadoPiloto} onChange={(v) => update("resultadoPiloto", v)} />
          </SeccionFormulario>

          <SeccionFormulario titulo="Evaluación final" defaultOpen puntaje={ev.evaluacionFinal.puntaje}>
            <SecEvaluacionFinal data={ev.evaluacionFinal} onChange={(v) => update("evaluacionFinal", v)} />
          </SeccionFormulario>

          {/* Controles inferiores */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado de la evaluación</label>
                <select
                  value={ev.estado}
                  onChange={(e) => update("estado", e.target.value as Estado)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  {ESTADOS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                {guardadoOk && (
                  <p className="text-sm text-green-600 font-medium">Guardado correctamente</p>
                )}
                <button
                  type="submit"
                  disabled={guardando}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {guardando ? "Guardando..." : "Guardar evaluación"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar puntaje */}
        <div className="lg:col-span-1">
          <PuntajeResumen evaluacion={ev} puntajeFinal={puntaje} />
        </div>
      </div>
    </form>
  );
}
