import type { Evaluacion } from "./types";

const PESOS: Record<string, number> = {
  implementacion: 10,
  integracion: 10,
  ia: 15,
  experienciaUso: 10,
  rendimiento: 10,
  seguridad: 10,
  escalabilidad: 8,
  soporte: 7,
  resultadoPiloto: 15,
  evaluacionFinal: 5,
};

export function calcularPuntaje(evaluacion: Partial<Evaluacion>): number {
  const total = Object.values(PESOS).reduce((a, b) => a + b, 0);
  let acumulado = 0;

  const get = (val: number | undefined) => (typeof val === "number" ? Math.min(10, Math.max(0, val)) : 0);

  acumulado += get(evaluacion.implementacion?.puntaje) * PESOS.implementacion;
  acumulado += get(evaluacion.integraciones?.puntaje) * PESOS.integracion;
  acumulado += get(evaluacion.ia?.puntaje) * PESOS.ia;
  acumulado += get(evaluacion.experienciaUso?.puntaje) * PESOS.experienciaUso;
  acumulado += get(evaluacion.rendimiento?.puntaje) * PESOS.rendimiento;
  acumulado += get(evaluacion.seguridad?.puntaje) * PESOS.seguridad;
  acumulado += get(evaluacion.escalabilidad?.puntaje) * PESOS.escalabilidad;
  acumulado += get(evaluacion.soporte?.puntaje) * PESOS.soporte;
  acumulado += get(evaluacion.resultadoPiloto?.puntaje) * PESOS.resultadoPiloto;
  acumulado += get(evaluacion.evaluacionFinal?.puntaje) * PESOS.evaluacionFinal;

  return Math.round((acumulado / total) * 10) / 10;
}

export function colorPuntaje(puntaje: number): string {
  if (puntaje >= 8) return "text-green-600";
  if (puntaje >= 6) return "text-yellow-600";
  return "text-red-600";
}

export function bgColorPuntaje(puntaje: number): string {
  if (puntaje >= 8) return "bg-green-100 text-green-800";
  if (puntaje >= 6) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export { PESOS };
