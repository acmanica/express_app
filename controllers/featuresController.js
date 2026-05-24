const { featuresService } = require("../services/featuresService")

function createFeaturesHandler(service = featuresService) {
  return async function featuresHandler(_req, res) {
    try {
      const payload = await service.getFeaturesPayload()

      return res.json(payload)
    } catch (_error) {
      return res.status(500).json({
        error: "No fue posible obtener las caracteristicas."
      })
    }
  }
}

module.exports = {
  createFeaturesHandler
}
