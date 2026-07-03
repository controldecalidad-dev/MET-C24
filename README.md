# MailCRM — Control24

CRM web para campañas de email marketing con tracking de aperturas y clicks integrado. Diseñado para trabajar junto a **n8n** como motor de envío.

## Stack

- **Next.js 16** (App Router, server components)
- **PostgreSQL** + **Prisma**
- **Tailwind CSS** + **Recharts**

## Instalación

```bash
npm install
cp .env.example .env.local   # completar DATABASE_URL y NEXT_PUBLIC_BASE_URL
npx prisma migrate dev --name init
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Producción

```bash
npm run build
npm start
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_BASE_URL` | URL pública del CRM (para construir links de tracking) |

## Estructura

```
app/
  page.tsx                      # Dashboard global
  contacts/                     # CRUD contactos
  campaigns/                    # CRUD campañas
  api/
    contacts/                   # REST contactos
    campaigns/                  # REST campañas
    sends/                      # Consulta envíos
    track/open/                 # Pixel 1x1 → registra apertura
    track/click/                # Registra click → redirige
    n8n/contacts/               # Devuelve HTML trackeado por contacto
    n8n/mark-sent/              # Marca envíos como realizados

components/
  ui/           # Button, Badge, Card, Input, StatCard
  layout/       # Sidebar
  dashboard/    # ClicksChart
  contacts/     # ContactForm
  campaigns/    # CampaignForm, CampaignStats

lib/
  prisma.ts     # PrismaClient singleton
  tracking.ts   # Inyección de pixel y links trackeados
  stats.ts      # Cálculo de métricas
```

## Cómo funciona el tracking

1. n8n llama `GET /api/n8n/contacts?campaignId=X`
2. El CRM devuelve cada contacto con su HTML personalizado (pixel + links ya trackeados)
3. n8n envía el correo con ese HTML
4. n8n hace `POST /api/n8n/mark-sent` con los envíos realizados
5. Las aperturas y clicks se registran automáticamente cuando el contacto interactúa

## Endpoints n8n

```http
# Obtener contactos pendientes con HTML trackeado
GET /api/n8n/contacts?campaignId={id}

# Marcar envíos como realizados
POST /api/n8n/mark-sent
Content-Type: application/json
{
  "sends": [
    { "campaignId": "...", "contactId": "...", "email": "..." }
  ]
}
```
