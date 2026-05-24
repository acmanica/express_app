const test = require("node:test")
const assert = require("node:assert/strict")

const { statusHandler } = require("./controllers/statusController")
const { createFeaturesHandler } = require("./controllers/featuresController")
const { createAgentsMathHandler } = require("./controllers/agentsController")
const {
  sumAgent,
  multiplyAgent,
  hasValidNumbers,
  run
} = require("./services/agentsMathService")
const { FeaturesService } = require("./services/featuresService")

function createMockResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    }
  }
}

test("sumAgent suma el numero indicado", () => {
  assert.deepEqual(sumAgent(10, 5), {
    agent: "sum-agent",
    operation: "add",
    input: 10,
    amount: 5,
    output: 15
  })
})

test("multiplyAgent multiplica el numero indicado", () => {
  assert.deepEqual(multiplyAgent(15, 3), {
    agent: "multiply-agent",
    operation: "multiply",
    input: 15,
    amount: 3,
    output: 45
  })
})

test("hasValidNumbers valida que todos los valores sean finitos", () => {
  assert.equal(hasValidNumbers(10, 5, 3), true)
  assert.equal(hasValidNumbers(10, "5", 3), false)
  assert.equal(hasValidNumbers(Number.NaN, 5, 3), false)
})

test("run ejecuta ambos agentes en secuencia", () => {
  assert.deepEqual(run(10, 5, 3), {
    input: 10,
    agents: [
      {
        agent: "sum-agent",
        operation: "add",
        input: 10,
        amount: 5,
        output: 15
      },
      {
        agent: "multiply-agent",
        operation: "multiply",
        input: 15,
        amount: 3,
        output: 45
      }
    ],
    result: 45
  })
})

test("statusHandler responde el estado del servicio", () => {
  const res = createMockResponse()

  statusHandler({}, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, {
    status: "ok",
    service: "codex-multi-agent-api"
  })
})

test("FeaturesService transforma el resultado del repository", async () => {
  const repository = {
    async findAllOrdered() {
      return [
        {
          position: 1,
          title: "5 caracteristicas de tener multi agents en Codex",
          text: "Primera caracteristica."
        },
        {
          position: 2,
          title: "5 caracteristicas de tener multi agents en Codex",
          text: "Segunda caracteristica."
        }
      ]
    }
  }
  const service = new FeaturesService(repository)

  const payload = await service.getFeaturesPayload()

  assert.deepEqual(payload, {
    title: "5 caracteristicas de tener multi agents en Codex",
    items: ["Primera caracteristica.", "Segunda caracteristica."]
  })
})

test("featuresHandler responde la lista de caracteristicas desde el service", async () => {
  const res = createMockResponse()
  const featuresHandler = createFeaturesHandler({
    async getFeaturesPayload() {
      return {
        title: "5 caracteristicas de tener multi agents en Codex",
        items: ["Uno", "Dos", "Tres", "Cuatro", "Cinco"]
      }
    }
  })

  await featuresHandler({}, res)

  assert.equal(res.statusCode, 200)
  assert.equal(res.body.title, "5 caracteristicas de tener multi agents en Codex")
  assert.equal(res.body.items.length, 5)
})

test("featuresHandler responde 500 cuando el service falla", async () => {
  const res = createMockResponse()
  const featuresHandler = createFeaturesHandler({
    async getFeaturesPayload() {
      throw new Error("db down")
    }
  })

  await featuresHandler({}, res)

  assert.equal(res.statusCode, 500)
  assert.deepEqual(res.body, {
    error: "No fue posible obtener las caracteristicas."
  })
})

test("agentsMathHandler responde el resultado esperado", () => {
  const req = {
    body: {
      number: 10,
      add: 5,
      multiply: 3
    }
  }
  const res = createMockResponse()
  const agentsMathHandler = createAgentsMathHandler()

  agentsMathHandler(req, res)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, {
    input: 10,
    agents: [
      {
        agent: "sum-agent",
        operation: "add",
        input: 10,
        amount: 5,
        output: 15
      },
      {
        agent: "multiply-agent",
        operation: "multiply",
        input: 15,
        amount: 3,
        output: 45
      }
    ],
    result: 45
  })
})

test("agentsMathHandler valida que todos los valores sean numeros", () => {
  const req = {
    body: {
      number: 10,
      add: "5",
      multiply: 3
    }
  }
  const res = createMockResponse()
  const agentsMathHandler = createAgentsMathHandler()

  agentsMathHandler(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, {
    error: "Debes enviar number, add y multiply como numeros."
  })
})

test("agentsMathHandler responde 400 cuando no hay body", () => {
  const req = {}
  const res = createMockResponse()
  const agentsMathHandler = createAgentsMathHandler()

  agentsMathHandler(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, {
    error: "Debes enviar number, add y multiply como numeros."
  })
})

test("agentsMathHandler rechaza numeros no finitos", () => {
  const req = {
    body: {
      number: Number.NaN,
      add: 5,
      multiply: 3
    }
  }
  const res = createMockResponse()
  const agentsMathHandler = createAgentsMathHandler()

  agentsMathHandler(req, res)

  assert.equal(res.statusCode, 400)
  assert.deepEqual(res.body, {
    error: "Debes enviar number, add y multiply como numeros."
  })
})
