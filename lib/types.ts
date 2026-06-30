export type Recomendacion = "Recomendado" | "Recomendado con reservas" | "No recomendado" | "Pendiente";
export type Estado = "Borrador" | "En evaluación" | "Completado" | "Archivado";

export interface SeccionPuntaje {
  implementacion: number;       // 0-10
  integracion: number;          // 0-10
  ia: number;                   // 0-10
  experienciaUso: number;       // 0-10
  rendimiento: number;          // 0-10
  seguridad: number;            // 0-10
  escalabilidad: number;        // 0-10
  soporte: number;              // 0-10
  resultadoPiloto: number;      // 0-10
  evaluacionFinal: number;      // 0-10
}

export interface InfoGeneral {
  nombreSolucion: string;
  proveedor: string;
  version: string;
  fechaEvaluacion: string;
  evaluador: string;
  categoria: string;
  sitioWeb: string;
}

export interface ObjetivoSolucion {
  problemaQueResuelve: string;
  casoDeUso: string;
  usuariosObjetivo: string;
  beneficiosEsperados: string;
}

export interface Implementacion {
  tiempoDespliegue: string;
  complejidadInstalacion: string;
  requisitosTecnicos: string;
  documentacion: string;
  capacitacionRequerida: string;
  notas: string;
  puntaje: number;
}

export interface Integraciones {
  apiDisponible: string;
  sistemasCompatibles: string;
  formatosDatos: string;
  facilidadIntegracion: string;
  notas: string;
  puntaje: number;
}

export interface InteligenciaArtificial {
  tipoIA: string;
  precisionDeteccion: string;
  falsosPositivos: string;
  aprendizajeAdaptativo: string;
  transparenciaModelo: string;
  notas: string;
  puntaje: number;
}

export interface Funcionalidades {
  listadoPrincipal: string;
  funcionesDestacadas: string;
  limitaciones: string;
  roadmap: string;
}

export interface ExperienciaUso {
  facilidadUso: string;
  interfazUsuario: string;
  curvaAprendizaje: string;
  accesibilidad: string;
  notas: string;
  puntaje: number;
}

export interface Rendimiento {
  velocidadProcesamiento: string;
  disponibilidad: string;
  latencia: string;
  consumoRecursos: string;
  notas: string;
  puntaje: number;
}

export interface Seguridad {
  cifradoDatos: string;
  autenticacion: string;
  cumplimientoNormativo: string;
  gestionAccesos: string;
  auditorias: string;
  notas: string;
  puntaje: number;
}

export interface Escalabilidad {
  capacidadCrecimiento: string;
  arquitectura: string;
  multiSede: string;
  notas: string;
  puntaje: number;
}

export interface Costos {
  modeloPrecio: string;
  costoImplementacion: string;
  costoLicencia: string;
  costosOcultos: string;
  relacionCostoValor: string;
}

export interface Soporte {
  tipoSoporte: string;
  horarioAtencion: string;
  tiempoRespuesta: string;
  comunidad: string;
  notas: string;
  puntaje: number;
}

export interface Riesgos {
  riesgosTecnicos: string;
  riesgosOperativos: string;
  riesgosProveedor: string;
  planMitigacion: string;
}

export interface ResultadoPiloto {
  duracionPiloto: string;
  resultadosObtenidos: string;
  incidentesDetectados: string;
  satisfaccionEquipo: string;
  metricas: string;
  notas: string;
  puntaje: number;
}

export interface EvaluacionFinal {
  resumenEjecutivo: string;
  recomendacion: Recomendacion;
  condicionesRecomendacion: string;
  proximosPasos: string;
  puntaje: number;
}

export interface Evaluacion {
  id: string;
  creadoEn: string;
  actualizadoEn: string;
  estado: Estado;
  puntajeFinal: number;

  infoGeneral: InfoGeneral;
  objetivo: ObjetivoSolucion;
  implementacion: Implementacion;
  integraciones: Integraciones;
  ia: InteligenciaArtificial;
  funcionalidades: Funcionalidades;
  experienciaUso: ExperienciaUso;
  rendimiento: Rendimiento;
  seguridad: Seguridad;
  escalabilidad: Escalabilidad;
  costos: Costos;
  soporte: Soporte;
  riesgos: Riesgos;
  fortalezas: string;
  debilidades: string;
  resultadoPiloto: ResultadoPiloto;
  evaluacionFinal: EvaluacionFinal;
}

export type EvaluacionParcial = Partial<Evaluacion> & { id: string };
