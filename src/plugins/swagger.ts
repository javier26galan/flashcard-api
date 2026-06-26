import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export async function registerSwagger(app: FastifyInstance): Promise<void> {
  app.register(swagger, {
    openapi: {
      info: {
        title: "Flashcard API",
        description: "API para crear mazos, estudiar tarjetas y guardar progreso.",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Servidor local",
        },
      ],
      tags: [
        {
          name: "Health",
          description: "Estado de la Api",
        },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      tryItOutEnabled: true,
      supportedSubmitMethods: ["get", "post", "put", "patch", "delete"],
    },
  });
}
