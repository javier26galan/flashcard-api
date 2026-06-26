import Fastify, { type FastifyInstance } from "fastify";
import { registerErrorHandlers } from "./shared/error-handler.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  registerErrorHandlers(app);

  app.get("/health", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  });
  return app;
}
