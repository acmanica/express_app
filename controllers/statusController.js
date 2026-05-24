function statusHandler(_req, res) {
  res.json({
    status: "ok",
    service: "codex-multi-agent-api"
  })
}

module.exports = {
  statusHandler
}
