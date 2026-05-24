const express = require("express")

const { statusHandler } = require("./controllers/statusController")
const { createFeaturesHandler } = require("./controllers/featuresController")
const { createAgentsMathHandler } = require("./controllers/agentsController")
const { featuresService } = require("./services/featuresService")
const { agentsMathService } = require("./services/agentsMathService")

function createApp(dependencies = {}) {
  const app = express()
  const resolvedFeaturesService = dependencies.featuresService || featuresService
  const resolvedAgentsMathService = dependencies.agentsMathService || agentsMathService

  app.use(express.json())

  app.get("/status", statusHandler)
  app.get("/features", createFeaturesHandler(resolvedFeaturesService))
  app.post("/agents/math", createAgentsMathHandler(resolvedAgentsMathService))

  return app
}

module.exports = {
  createApp
}
