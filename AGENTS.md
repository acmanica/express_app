# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Express API with a flat structure:

- `server.js`: app setup, route handlers, and the exported agent functions.
- `server.test.js`: unit tests for handlers and agent helpers using `node:test`.
- `package.json`: scripts and runtime dependencies.
- `README.md`: local usage and endpoint examples.

Keep new logic close to existing behavior. If the app grows, split route handlers and agent functions into dedicated modules instead of expanding `server.js` indefinitely.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm start`: start the API with Node on `http://localhost:3011`.
- `npm run dev`: run the server in watch mode for local development.
- `npm test`: run the test suite with Node’s built-in test runner.

Example:

```bash
npm run dev
npm test
```

## Coding Style & Naming Conventions
Follow the existing JavaScript style in the repo: 2-space indentation, semicolons omitted, double quotes, and small focused functions. Prefer:

- `camelCase` for variables and functions (`agentsMathHandler`)
- descriptive route and helper names (`sumAgent`, `multiplyAgent`)
- one responsibility per function

Keep responses and validation messages consistent with the current Spanish-facing API text.

## Testing Guidelines
Tests live in `server.test.js` and use `node:test` plus `node:assert/strict`. Add tests for every new handler, helper, and validation branch. Name tests by behavior, for example:

- `"agentsMathHandler ejecuta ambos agentes en secuencia"`
- `"agentsMathHandler valida que todos los valores sean numeros"`

Run `npm test` before opening a PR. Maintain coverage for both success and error responses.

## Commit & Pull Request Guidelines
This repository has no commit history yet, so use simple imperative commit messages such as `Add input validation for math agent`. Keep each commit focused on one change.

Pull requests should include:

- a short description of the behavior change
- test coverage for new logic
- example request/response payloads when API output changes
- updated `README.md` if commands or endpoints change

## Configuration Tips
The server uses `PORT` and defaults to `3011`. Set `PORT=3000 npm start` when you need a different local port.
