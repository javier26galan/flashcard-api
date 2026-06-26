import Fastify, { type FastifyInstance } from "fastify";
import { registerSwagger } from "./plugins/swagger.js";
import { registerErrorHandlers } from "./shared/error-handler.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });
  await registerSwagger(app);
  registerErrorHandlers(app);

  app.get(
    "/health",
    {
      schema: {
        tags: ["Health"],
        summary: "COmprobar el stado de la Api",
        response: {
          200: {
            type: "object",
            required: ["status", "timestamp"],
            properties: {
              status: {
                type: "string",
              },
              timestamp: {
                type: "string",
                format: "date-time",
              },
            },
          },
        },
      },
    },
    async () => {
      return {
        status: "ok",
        timestamp: new Date().toISOString(),
      };
    },
  );
  return app;
}
