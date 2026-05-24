const { featuresRepository } = require("../repositories/featuresRepository")

class FeaturesService {
  constructor(repository) {
    this.repository = repository
  }

  async getFeaturesPayload() {
    const features = await this.repository.findAllOrdered()

    return {
      title: features[0]?.title || "",
      items: features.map((feature) => feature.text)
    }
  }
}

const featuresService = new FeaturesService(featuresRepository)

module.exports = {
  FeaturesService,
  featuresService
}
