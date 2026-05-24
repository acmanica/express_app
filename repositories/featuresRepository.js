const { prisma } = require("../lib/prisma")

class FeaturesRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient
  }

  async findAllOrdered() {
    return this.prisma.feature.findMany({
      orderBy: {
        position: "asc"
      }
    })
  }
}

const featuresRepository = new FeaturesRepository(prisma)

module.exports = {
  FeaturesRepository,
  featuresRepository
}
