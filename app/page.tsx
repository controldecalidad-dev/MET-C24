import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center py-16">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          Herramienta interna — Control24
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          MET C24
          <span className="block text-2xl font-semibold text-gray-500 mt-1">
            Evaluación de Alternativas Tecnológicas
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Plataforma para evaluar, comparar y documentar soluciones tecnológicas de forma estructurada.
          Generá evaluaciones completas con puntaje automático y ranking comparativo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/evaluaciones/nueva"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition-colors"
          >
            Nueva evaluación
          </Link>
          <Link
            href="/evaluaciones"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-lg text-base border border-gray-300 transition-colors"
          >
            Ver evaluaciones
          </Link>
        </div>
      </div>

      {/* Cards de características */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
        {[
          {
            icono: "📋",
            titulo: "Evaluación estructurada",
            descripcion: "17 secciones que cubren implementación, IA, seguridad, costos, soporte y más.",
          },
          {
            icono: "📊",
            titulo: "Puntaje automático",
            descripcion: "Cálculo ponderado sobre 10 dimensiones clave con visualización en tiempo real.",
          },
          {
            icono: "🏆",
            titulo: "Ranking comparativo",
            descripcion: "Compará todas las alternativas evaluadas de mayor a menor puntaje.",
          },
        ].map((card) => (
          <div key={card.titulo} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-3xl mb-3">{card.icono}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{card.titulo}</h3>
            <p className="text-sm text-gray-600">{card.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Secciones evaluadas */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Secciones del formulario de evaluación</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {[
            "Información general",
            "Objetivo de la solución",
            "Implementación",
            "Integraciones",
            "Inteligencia Artificial",
            "Funcionalidades",
            "Experiencia de uso",
            "Rendimiento",
            "Seguridad",
            "Escalabilidad",
            "Costos",
            "Soporte",
            "Riesgos",
            "Fortalezas / Debilidades",
            "Resultado del piloto",
            "Evaluación final",
          ].map((sec) => (
            <div key={sec} className="flex items-center gap-2 text-sm text-gray-600 py-1">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
              {sec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
