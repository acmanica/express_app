# 2-expess-app

API basica con Express que expone:

- `GET /status`: estado del servicio.
- `GET /features`: lista de caracteristicas obtenida desde SQLite con Prisma.
- `POST /agents/math`: ejecuta dos agentes en secuencia.

## Stack

- Node.js
- Express
- Prisma ORM
- SQLite

## Estructura

```text
.
├── app.js
├── controllers/
├── services/
├── repositories/
├── lib/
├── prisma/
└── server.js
```

- `server.js`: arranque HTTP.
- `app.js`: composicion de Express y dependencias.
- `controllers/`: capa HTTP.
- `services/`: logica de negocio.
- `repositories/`: acceso a datos.
- `prisma/`: schema, migraciones y seed.

## Requisitos

- Node.js 18 o superior
- npm

## Instalacion

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init_features
npx prisma db seed
```

`prisma migrate dev` crea la base SQLite local y aplica las migraciones.

## Scripts

```bash
npm start
```

Inicia la API en `http://localhost:3011`.

```bash
npm run dev
```

Inicia la API en modo watch.

```bash
npm test
```

Ejecuta las pruebas unitarias.

```bash
npm run prisma:generate
```

Genera Prisma Client.

```bash
npm run prisma:migrate -- --name <nombre>
```

Crea y aplica una nueva migracion.

```bash
npx prisma db seed
```

Ejecuta el seed inicial de `features`.

## Configuracion

La conexion local usa `.env`:

```bash
DATABASE_URL="file:./dev.db"
```

Tienes una referencia en `.env.example`.

El servidor usa `PORT` y por defecto escucha en `3011`.

## Endpoints

### `GET /status`

Respuesta:

```json
{
  "status": "ok",
  "service": "codex-multi-agent-api"
}
```

### `GET /features`

Devuelve el contenido cargado en SQLite por el seed inicial.

Respuesta:

```json
{
  "title": "5 caracteristicas de tener multi agents en Codex",
  "items": [
    "Permite dividir trabajo complejo entre agentes especializados.",
    "Acelera investigacion, implementacion y validacion en paralelo.",
    "Mejora el contexto por rol al separar analisis, codigo y revision.",
    "Reduce cuellos de botella en tareas grandes o de varios pasos.",
    "Facilita comparar enfoques antes de consolidar una solucion final."
  ]
}
```

### `POST /agents/math`

Ejemplo:

```bash
curl -X POST http://localhost:3011/agents/math \
  -H "Content-Type: application/json" \
  -d '{"number":10,"add":5,"multiply":3}'
```

Respuesta:

```json
{
  "input": 10,
  "agents": [
    {
      "agent": "sum-agent",
      "operation": "add",
      "input": 10,
      "amount": 5,
      "output": 15
    },
    {
      "agent": "multiply-agent",
      "operation": "multiply",
      "input": 15,
      "amount": 3,
      "output": 45
    }
  ],
  "result": 45
}
```

Si algun valor no es numerico, responde con `400`:

```json
{
  "error": "Debes enviar number, add y multiply como numeros."
}
```

## Pruebas

El proyecto incluye pruebas para:

- controllers
- services
- validacion del endpoint matematico

Ejecuta:

```bash
npm test
```
