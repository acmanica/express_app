# Resumen del cambio: fix bugs

## Objetivo

Corregir errores en el endpoint `POST /agents/math` para mejorar la validacion de entrada y evitar fallos por peticiones incompletas.

## Cambios realizados

- Se actualizo `agentsMathHandler` en `server.js`.
- Se agrego proteccion cuando `req.body` no existe.
- Se reemplazo la validacion basada en `typeof value === "number"` por `Number.isFinite`.

## Problemas corregidos

### 1. Body ausente

Antes, si la peticion llegaba sin `body`, el handler lanzaba un error al intentar desestructurar `req.body`.

Ahora, el endpoint responde con `400` y este mensaje:

```json
{
  "error": "Debes enviar number, add y multiply como numeros."
}
```

### 2. Valores numericos invalidos

Antes, valores como `NaN` o `Infinity` pasaban la validacion porque su tipo seguia siendo `number`.

Ahora, esos casos se rechazan correctamente con `400`.

## Pruebas agregadas

Se actualizaron las pruebas en `server.test.js` para cubrir:

- Peticion sin `body`
- Peticion con numeros no finitos como `NaN`

## Verificacion

Se ejecuto:

```bash
npm test
```

Resultado:

- 8 pruebas ejecutadas
- 8 pruebas aprobadas

## Archivos modificados

- `server.js`
- `server.test.js`
