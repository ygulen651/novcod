import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "node_modules/**", ".claude-flow/**", ".swarm/**", ".playwright-mcp/**"] },
];

export default config;
