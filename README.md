# 2-expess-app

API basica con Express que expone un ejemplo sencillo de dos agentes:

- `sum-agent`: suma un numero.
- `multiply-agent`: multiplica el resultado anterior.

## Requisitos

- Node.js 18 o superior
- npm

## Instalacion

```bash
npm install
```

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

Ejecuta las pruebas unitarias con `node:test`.

## Endpoints

### `GET /status`

Devuelve el estado del servicio.

Ejemplo:

```bash
curl http://localhost:3011/status
```

Respuesta:

```json
{
  "status": "ok",
  "service": "codex-multi-agent-api"
}
```

### `GET /features`

Devuelve una lista de caracteristicas del enfoque multi-agent.

Ejemplo:

```bash
curl http://localhost:3011/features
```

### `POST /agents/math`

Ejecuta dos agentes en secuencia:

1. Suma `add` al valor `number`.
2. Multiplica el resultado por `multiply`.

Body esperado:

```json
{
  "number": 10,
  "add": 5,
  "multiply": 3
}
```

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

Si algun valor no es numerico, la API responde con `400`:

```json
{
  "error": "Debes enviar number, add y multiply como numeros."
}
```

## Pruebas

El proyecto incluye pruebas unitarias para:

- `sumAgent`
- `multiplyAgent`
- `statusHandler`
- `featuresHandler`
- `agentsMathHandler`

Ejecuta:

```bash
npm test
```
