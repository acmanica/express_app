function sumAgent(value, amountToAdd) {
  return {
    agent: "sum-agent",
    operation: "add",
    input: value,
    amount: amountToAdd,
    output: value + amountToAdd
  }
}

function multiplyAgent(value, amountToMultiply) {
  return {
    agent: "multiply-agent",
    operation: "multiply",
    input: value,
    amount: amountToMultiply,
    output: value * amountToMultiply
  }
}

function hasValidNumbers(...values) {
  return values.every(Number.isFinite)
}

function run(number, add, multiply) {
  const firstAgent = sumAgent(number, add)
  const secondAgent = multiplyAgent(firstAgent.output, multiply)

  return {
    input: number,
    agents: [firstAgent, secondAgent],
    result: secondAgent.output
  }
}

const agentsMathService = {
  hasValidNumbers,
  run
}

module.exports = {
  sumAgent,
  multiplyAgent,
  hasValidNumbers,
  run,
  agentsMathService
}
