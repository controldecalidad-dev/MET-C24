# MET C24 — Evaluación de Alternativas Tecnológicas

Herramienta interna de **Control24** para evaluar, comparar y documentar soluciones tecnológicas (videoverificación con IA, control de acceso, analítica de video, etc.).

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS**
- **Persistencia**: `localStorage` (intercambiable vía `StorageAdapter`)

## Instalación

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Producción

```bash
npm run build
npm start
```

## Estructura de carpetas

```
app/                      # Rutas Next.js
  page.tsx                # Pantalla inicial
  evaluaciones/
    page.tsx              # Lista + ranking
    nueva/page.tsx        # Nueva evaluación
    [id]/page.tsx         # Detalle
    [id]/editar/page.tsx  # Edición

components/
  evaluacion/             # Formulario y secciones
  resultados/             # Tabla y ranking
  ui/                     # Componentes base
  layout/                 # Header

lib/
  types.ts                # Tipos TypeScript
  scoring.ts              # Cálculo de puntaje ponderado
  storage.ts              # Capa de persistencia (StorageAdapter)
  defaults.ts             # Valores por defecto

hooks/
  useEvaluaciones.ts      # Hook central de estado
```

## Cómo funciona el puntaje

El puntaje final (sobre 10) es un promedio ponderado de 10 dimensiones:

| Dimensión | Peso |
|-----------|------|
| Implementación | 10% |
| Integración | 10% |
| Inteligencia Artificial | 15% |
| Experiencia de uso | 10% |
| Rendimiento | 10% |
| Seguridad | 10% |
| Escalabilidad | 8% |
| Soporte | 7% |
| Resultado del piloto | 15% |
| Evaluación final | 5% |

Los pesos se configuran en `lib/scoring.ts`.

## Conectar a base externa (Supabase, Google Sheets)

La capa de persistencia usa la interfaz `StorageAdapter` (`lib/storage.ts`).
Para cambiar el backend, implementá un nuevo adaptador y reemplazá la instancia exportada:

```ts
export const storage: StorageAdapter = new SupabaseAdapter();
```

Sin tocar nada más en la app.
