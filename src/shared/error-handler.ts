import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./app-errors.js";

type ErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function registerErrorHandlers(app: FastifyInstance): void {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error.validation) {
      const response: ErrorResponse = {
        error: {
          code: "VALIDATION_ERROR",
          message: "Los Datos enviados no son válidos",
          details: error.validation,
        },
      };
      return reply.status(400).send(response);
    }

    if (error instanceof AppError) {
      const response: ErrorResponse = {
        error: {
          code: error.code,
          message: error.message,
          ...(error.details !== undefined ? { details: error.details } : {}),
        },
      };
      return reply.status(error.statusCode).send(response);
    }
    request.log.error(
      {
        err: error,
        method: request.method,
        url: request.url,
      },
      "Unexpected application error",
    );
    const response: ErrorResponse = {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error interno",
      },
    };
    return reply.status(500).send(response);
  });

  app.setNotFoundHandler((request, reply) => {
    const response: ErrorResponse = {
      error: {
        code: "ROUTE_NOT_FOUND",
        message: `No existe la ruta ${request.method} ${request.url}`,
      },
    };
    return reply.status(404).send(response);
  });
}
