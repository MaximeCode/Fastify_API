export function registerErrorMiddleware(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    console.log(error);
    if (error.name === "NotFoundError") {
      reply.status(404).send({ ok: false, error: error.message });
    } else if (error.name === "NotAuthorizedError") {
      reply.status(401).send({ ok: false, error: error.message });
    } else {
      reply.status(500).send({ ok: false, error: error.message });
    }
  });
}
