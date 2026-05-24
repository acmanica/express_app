# Smoke Test

## Objetivo

Validar que la API levanta bien, que Prisma puede leer SQLite y que los endpoints principales responden como se espera.

## Requisitos

- Node.js instalado
- Dependencias instaladas con `npm install`
- Base local preparada con:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init_features
npx prisma db seed
```

## Levantar el servicio

Ejecuta:

```bash
npm start
```

La API debe quedar disponible en:

```bash
http://localhost:3011
```

## Pruebas smoke

### 1. Verificar estado del servicio

```bash
curl http://localhost:3011/status
```

Respuesta esperada:

```json
{
  "status": "ok",
  "service": "codex-multi-agent-api"
}
```

### 2. Verificar listado de caracteristicas desde SQLite

```bash
curl http://localhost:3011/features
```

Validar que la respuesta incluya:

- Un campo `title`
- Un arreglo `items`
- Cinco elementos sembrados por Prisma

### 3. Verificar flujo exitoso de agentes

```bash
curl -X POST http://localhost:3011/agents/math \
  -H "Content-Type: application/json" \
  -d '{"number":10,"add":5,"multiply":3}'
```

Respuesta esperada:

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

### 4. Verificar validacion de entrada

```bash
curl -X POST http://localhost:3011/agents/math \
  -H "Content-Type: application/json" \
  -d '{"number":10,"add":"5","multiply":3}'
```

Respuesta esperada:

```json
{
  "error": "Debes enviar number, add y multiply como numeros."
}
```

### 5. Verificar body ausente

```bash
curl -X POST http://localhost:3011/agents/math
```

Resultado esperado:

- La API no debe caerse
- Debe responder con error `400`

## Verificacion automatica

```bash
npm test
```

Resultado esperado:

- Todas las pruebas deben pasar
