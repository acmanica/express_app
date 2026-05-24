const test = require("node:test");
const assert = require("node:assert/strict");

const {
  sumAgent,
  multiplyAgent,
  statusHandler,
  featuresHandler,
  agentsMathHandler
} = require("./server");

function createMockResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

test("sumAgent suma el numero indicado", () => {
  assert.deepEqual(sumAgent(10, 5), {
    agent: "sum-agent",
    operation: "add",
    input: 10,
    amount: 5,
    output: 15
  });
});

test("multiplyAgent multiplica el numero indicado", () => {
  assert.deepEqual(multiplyAgent(15, 3), {
    agent: "multiply-agent",
    operation: "multiply",
    input: 15,
    amount: 3,
    output: 45
  });
});

test("statusHandler responde el estado del servicio", () => {
  const res = createMockResponse();

  statusHandler({}, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    status: "ok",
    service: "codex-multi-agent-api"
  });
});

test("featuresHandler responde la lista de caracteristicas", () => {
  const res = createMockResponse();

  featuresHandler({}, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.title, "5 caracteristicas de tener multi agents en Codex");
  assert.equal(res.body.items.length, 5);
});

test("agentsMathHandler ejecuta ambos agentes en secuencia", () => {
  const req = {
    body: {
      number: 10,
      add: 5,
      multiply: 3
    }
  };
  const res = createMockResponse();

  agentsMathHandler(req, res);

  assert.equal(res.statusCode, 200);
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
  });
});

test("agentsMathHandler valida que todos los valores sean numeros", () => {
  const req = {
    body: {
      number: 10,
      add: "5",
      multiply: 3
    }
  };
  const res = createMockResponse();

  agentsMathHandler(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    error: "Debes enviar number, add y multiply como numeros."
  });
});

test("agentsMathHandler responde 400 cuando no hay body", () => {
  const req = {};
  const res = createMockResponse();

  agentsMathHandler(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    error: "Debes enviar number, add y multiply como numeros."
  });
});

test("agentsMathHandler rechaza numeros no finitos", () => {
  const req = {
    body: {
      number: Number.NaN,
      add: 5,
      multiply: 3
    }
  };
  const res = createMockResponse();

  agentsMathHandler(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {
    error: "Debes enviar number, add y multiply como numeros."
  });
});
