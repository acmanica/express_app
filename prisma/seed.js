require("dotenv/config")

const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3")
const { PrismaClient } = require("@prisma/client")

const { featuresSeedData } = require("../data/featuresSeedData")

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db"
})
const prisma = new PrismaClient({ adapter })

async function main() {
  for (const feature of featuresSeedData) {
    await prisma.feature.upsert({
      where: {
        position: feature.position
      },
      update: {
        title: feature.title,
        text: feature.text
      },
      create: feature
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
