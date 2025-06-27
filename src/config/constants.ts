// config/constants.ts
export const CONFIG = {
  server: {
    port: process.env.NEXRENDER_PORT,
    secret: process.env.NEXRENDER_SECRET || "myapisecret",
    baseUrl: `http://localhost:${process.env.NEXRENDER_PORT}`,
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
