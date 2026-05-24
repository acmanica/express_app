const { createApp } = require("./app")

const port = process.env.PORT || 3011
const app = createApp()

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`)
  })
}

module.exports = app
