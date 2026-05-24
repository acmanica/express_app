const { agentsMathService } = require("../services/agentsMathService")

function createAgentsMathHandler(service = agentsMathService) {
  return function agentsMathHandler(req, res) {
    const { number, add, multiply } = req.body ?? {}

    if (!service.hasValidNumbers(number, add, multiply)) {
      return res.status(400).json({
        error: "Debes enviar number, add y multiply como numeros."
      })
    }

    return res.json(service.run(number, add, multiply))
  }
}

module.exports = {
  createAgentsMathHandler
}
