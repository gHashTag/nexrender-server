// config/constants.ts
export const CONFIG = {
  server: {
    port: process.env.NEXRENDER_PORT || 3000,
    secret: process.env.NEXRENDER_SECRET || "myapisecret",
    baseUrl: "http://localhost:3000",
  },
  paths: {
    base: process.cwd(),
    templates: "template",
    output: "output",
  },
  render: {
    retries: 3,
    timeout: 2000,
    interval: 5000,
  },
};
