const express = require("express");

const app = express();
const port = process.env.PORT || 3011;

app.use(express.json());

function sumAgent(value, amountToAdd) {
  return {
    agent: "sum-agent",
    operation: "add",
    input: value,
    amount: amountToAdd,
    output: value + amountToAdd
  };
}

function multiplyAgent(value, amountToMultiply) {
  return {
    agent: "multiply-agent",
    operation: "multiply",
    input: value,
    amount: amountToMultiply,
    output: value * amountToMultiply
  };
}

function statusHandler(_req, res) {
  res.json({
    status: "ok",
    service: "codex-multi-agent-api"
  });
}

function featuresHandler(_req, res) {
  res.json({
    title: "5 caracteristicas de tener multi agents en Codex",
    items: [
      "Permite dividir trabajo complejo entre agentes especializados.",
      "Acelera investigacion, implementacion y validacion en paralelo.",
      "Mejora el contexto por rol al separar analisis, codigo y revision.",
      "Reduce cuellos de botella en tareas grandes o de varios pasos.",
      "Facilita comparar enfoques antes de consolidar una solucion final."
    ]
  });
}

function agentsMathHandler(req, res) {
  const { number, add, multiply } = req.body;

  if (![number, add, multiply].every((value) => typeof value === "number")) {
    return res.status(400).json({
      error: "Debes enviar number, add y multiply como numeros."
    });
  }

  const firstAgent = sumAgent(number, add);
  const secondAgent = multiplyAgent(firstAgent.output, multiply);

  return res.json({
    input: number,
    agents: [firstAgent, secondAgent],
    result: secondAgent.output
  });
}

app.get("/status", statusHandler);
app.get("/features", featuresHandler);
app.post("/agents/math", agentsMathHandler);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });
}

module.exports = app;
module.exports.sumAgent = sumAgent;
module.exports.multiplyAgent = multiplyAgent;
module.exports.statusHandler = statusHandler;
module.exports.featuresHandler = featuresHandler;
module.exports.agentsMathHandler = agentsMathHandler;
