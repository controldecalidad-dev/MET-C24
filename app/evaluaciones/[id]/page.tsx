"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { storage } from "@/lib/storage";
import type { Evaluacion } from "@/lib/types";
import { PuntajeCirculo } from "@/components/ui/PuntajeCirculo";
import { BadgeRecomendacion, BadgeEstado } from "@/components/ui/Badge";
import { PESOS } from "@/lib/scoring";

const SECCIONES_PUNTAJE = [
  { label: "Implementación", get: (e: Evaluacion) => e.implementacion.puntaje, key: "implementacion" },
  { label: "Integraciones", get: (e: Evaluacion) => e.integraciones.puntaje, key: "integracion" },
  { label: "Inteligencia Artificial", get: (e: Evaluacion) => e.ia.puntaje, key: "ia" },
  { label: "Experiencia de uso", get: (e: Evaluacion) => e.experienciaUso.puntaje, key: "experienciaUso" },
  { label: "Rendimiento", get: (e: Evaluacion) => e.rendimiento.puntaje, key: "rendimiento" },
  { label: "Seguridad", get: (e: Evaluacion) => e.seguridad.puntaje, key: "seguridad" },
  { label: "Escalabilidad", get: (e: Evaluacion) => e.escalabilidad.puntaje, key: "escalabilidad" },
  { label: "Soporte", get: (e: Evaluacion) => e.soporte.puntaje, key: "soporte" },
  { label: "Resultado del piloto", get: (e: Evaluacion) => e.resultadoPiloto.puntaje, key: "resultadoPiloto" },
  { label: "Evaluación final", get: (e: Evaluacion) => e.evaluacionFinal.puntaje, key: "evaluacionFinal" },
] as const;

function Campo({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{value}</p>
    </div>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{titulo}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function DetalleEvaluacionPage() {
  const params = useParams();
  const router = useRouter();
  const [ev, setEv] = useState<Evaluacion | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    storage.getById(params.id as string).then((data) => {
      setEv(data);
      setCargando(false);
    });
  }, [params.id]);

  if (cargando) return <div className="text-center py-16 text-gray-400">Cargando...</div>;
  if (!ev) return (
    <div className="text-center py-16">
      <p className="text-gray-500">Evaluación no encontrada</p>
      <Link href="/evaluaciones" className="text-red-600 text-sm mt-2 inline-block">Volver a evaluaciones</Link>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/evaluaciones" className="hover:text-gray-700">Evaluaciones</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{ev.infoGeneral.nombreSolucion || "Detalle"}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <PuntajeCirculo puntaje={ev.puntajeFinal} size="lg" />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{ev.infoGeneral.nombreSolucion}</h1>
                <p className="text-gray-500 mt-0.5">{ev.infoGeneral.proveedor} {ev.infoGeneral.version && `· v${ev.infoGeneral.version}`}</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <BadgeRecomendacion value={ev.evaluacionFinal.recomendacion} />
                  <BadgeEstado value={ev.estado} />
                  <span className="text-xs text-gray-400">Evaluado por {ev.infoGeneral.evaluador}</span>
                  <span className="text-xs text-gray-400">{new Date(ev.infoGeneral.fechaEvaluacion).toLocaleDateString("es-AR")}</span>
                </div>
              </div>
              <Link
                href={`/evaluaciones/${ev.id}/editar`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Editar
              </Link>
            </div>
            {ev.evaluacionFinal.resumenEjecutivo && (
              <p className="text-sm text-gray-600 mt-4 leading-relaxed">{ev.evaluacionFinal.resumenEjecutivo}</p>
            )}
          </div>
        </div>

        {/* Barras de puntaje */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SECCIONES_PUNTAJE.map((s) => {
            const val = s.get(ev);
            const peso = PESOS[s.key as keyof typeof PESOS];
            return (
              <div key={s.key} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-36 shrink-0">{s.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${val >= 8 ? "bg-green-500" : val >= 6 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${(val / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 w-8 text-right tabular-nums">{val}/10</span>
                <span className="text-xs text-gray-400 w-8">×{peso}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secciones de detalle */}
      <Seccion titulo="Objetivo de la solución">
        <Campo label="Problema que resuelve" value={ev.objetivo.problemaQueResuelve} />
        <Campo label="Caso de uso" value={ev.objetivo.casoDeUso} />
        <Campo label="Usuarios objetivo" value={ev.objetivo.usuariosObjetivo} />
        <Campo label="Beneficios esperados" value={ev.objetivo.beneficiosEsperados} />
      </Seccion>

      <Seccion titulo="Implementación">
        <Campo label="Tiempo de despliegue" value={ev.implementacion.tiempoDespliegue} />
        <Campo label="Complejidad" value={ev.implementacion.complejidadInstalacion} />
        <Campo label="Requisitos técnicos" value={ev.implementacion.requisitosTecnicos} />
        <Campo label="Documentación" value={ev.implementacion.documentacion} />
        <Campo label="Capacitación requerida" value={ev.implementacion.capacitacionRequerida} />
        <Campo label="Notas" value={ev.implementacion.notas} />
      </Seccion>

      <Seccion titulo="Integraciones">
        <Campo label="API disponible" value={ev.integraciones.apiDisponible} />
        <Campo label="Sistemas compatibles" value={ev.integraciones.sistemasCompatibles} />
        <Campo label="Formatos de datos" value={ev.integraciones.formatosDatos} />
        <Campo label="Facilidad de integración" value={ev.integraciones.facilidadIntegracion} />
        <Campo label="Notas" value={ev.integraciones.notas} />
      </Seccion>

      <Seccion titulo="Inteligencia Artificial">
        <Campo label="Tipo de IA" value={ev.ia.tipoIA} />
        <Campo label="Precisión de detección" value={ev.ia.precisionDeteccion} />
        <Campo label="Falsos positivos" value={ev.ia.falsosPositivos} />
        <Campo label="Aprendizaje adaptativo" value={ev.ia.aprendizajeAdaptativo} />
        <Campo label="Transparencia del modelo" value={ev.ia.transparenciaModelo} />
        <Campo label="Notas" value={ev.ia.notas} />
      </Seccion>

      <Seccion titulo="Funcionalidades">
        <div className="sm:col-span-2">
          <Campo label="Listado principal" value={ev.funcionalidades.listadoPrincipal} />
        </div>
        <Campo label="Funciones destacadas" value={ev.funcionalidades.funcionesDestacadas} />
        <Campo label="Limitaciones" value={ev.funcionalidades.limitaciones} />
        <div className="sm:col-span-2">
          <Campo label="Roadmap" value={ev.funcionalidades.roadmap} />
        </div>
      </Seccion>

      <Seccion titulo="Experiencia de uso">
        <Campo label="Facilidad de uso" value={ev.experienciaUso.facilidadUso} />
        <Campo label="Interfaz de usuario" value={ev.experienciaUso.interfazUsuario} />
        <Campo label="Curva de aprendizaje" value={ev.experienciaUso.curvaAprendizaje} />
        <Campo label="Accesibilidad" value={ev.experienciaUso.accesibilidad} />
        <Campo label="Notas" value={ev.experienciaUso.notas} />
      </Seccion>

      <Seccion titulo="Rendimiento">
        <Campo label="Velocidad de procesamiento" value={ev.rendimiento.velocidadProcesamiento} />
        <Campo label="Disponibilidad" value={ev.rendimiento.disponibilidad} />
        <Campo label="Latencia" value={ev.rendimiento.latencia} />
        <Campo label="Consumo de recursos" value={ev.rendimiento.consumoRecursos} />
        <Campo label="Notas" value={ev.rendimiento.notas} />
      </Seccion>

      <Seccion titulo="Seguridad">
        <Campo label="Cifrado de datos" value={ev.seguridad.cifradoDatos} />
        <Campo label="Autenticación" value={ev.seguridad.autenticacion} />
        <Campo label="Cumplimiento normativo" value={ev.seguridad.cumplimientoNormativo} />
        <Campo label="Gestión de accesos" value={ev.seguridad.gestionAccesos} />
        <Campo label="Auditorías y logs" value={ev.seguridad.auditorias} />
        <Campo label="Notas" value={ev.seguridad.notas} />
      </Seccion>

      <Seccion titulo="Escalabilidad">
        <Campo label="Capacidad de crecimiento" value={ev.escalabilidad.capacidadCrecimiento} />
        <Campo label="Arquitectura" value={ev.escalabilidad.arquitectura} />
        <Campo label="Soporte multi-sede" value={ev.escalabilidad.multiSede} />
        <Campo label="Notas" value={ev.escalabilidad.notas} />
      </Seccion>

      <Seccion titulo="Costos">
        <Campo label="Modelo de precio" value={ev.costos.modeloPrecio} />
        <Campo label="Costo de implementación" value={ev.costos.costoImplementacion} />
        <Campo label="Costo de licencia" value={ev.costos.costoLicencia} />
        <Campo label="Costos ocultos" value={ev.costos.costosOcultos} />
        <div className="sm:col-span-2">
          <Campo label="Relación costo-valor" value={ev.costos.relacionCostoValor} />
        </div>
      </Seccion>

      <Seccion titulo="Soporte">
        <Campo label="Tipo de soporte" value={ev.soporte.tipoSoporte} />
        <Campo label="Horario de atención" value={ev.soporte.horarioAtencion} />
        <Campo label="Tiempo de respuesta" value={ev.soporte.tiempoRespuesta} />
        <Campo label="Comunidad" value={ev.soporte.comunidad} />
        <Campo label="Notas" value={ev.soporte.notas} />
      </Seccion>

      <Seccion titulo="Riesgos">
        <Campo label="Riesgos técnicos" value={ev.riesgos.riesgosTecnicos} />
        <Campo label="Riesgos operativos" value={ev.riesgos.riesgosOperativos} />
        <Campo label="Riesgos del proveedor" value={ev.riesgos.riesgosProveedor} />
        <Campo label="Plan de mitigación" value={ev.riesgos.planMitigacion} />
      </Seccion>

      {(ev.fortalezas || ev.debilidades) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ev.fortalezas && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-green-800 mb-3">Fortalezas</h3>
              <p className="text-sm text-green-700 whitespace-pre-wrap">{ev.fortalezas}</p>
            </div>
          )}
          {ev.debilidades && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-red-800 mb-3">Debilidades</h3>
              <p className="text-sm text-red-700 whitespace-pre-wrap">{ev.debilidades}</p>
            </div>
          )}
        </div>
      )}

      <Seccion titulo="Resultado del piloto">
        <Campo label="Duración" value={ev.resultadoPiloto.duracionPiloto} />
        <Campo label="Métricas" value={ev.resultadoPiloto.metricas} />
        <Campo label="Resultados obtenidos" value={ev.resultadoPiloto.resultadosObtenidos} />
        <Campo label="Incidentes" value={ev.resultadoPiloto.incidentesDetectados} />
        <Campo label="Satisfacción del equipo" value={ev.resultadoPiloto.satisfaccionEquipo} />
        <Campo label="Notas" value={ev.resultadoPiloto.notas} />
      </Seccion>

      {(ev.evaluacionFinal.condicionesRecomendacion || ev.evaluacionFinal.proximosPasos) && (
        <Seccion titulo="Evaluación final — detalles">
          <Campo label="Condiciones de la recomendación" value={ev.evaluacionFinal.condicionesRecomendacion} />
          <Campo label="Próximos pasos" value={ev.evaluacionFinal.proximosPasos} />
        </Seccion>
      )}
    </div>
  );
}
