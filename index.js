import Fastify from "fastify";
import { registerPostRoutes } from "./controllers/post.js";
import { registerAuthRoutes } from "./controllers/auth.js";
import { registerCategoryRoutes } from "./controllers/category.js";
import FastifyCors from "@fastify/cors";
import FastifyAuth from "@fastify/auth";
import { registerAuthMiddleware } from "./middleware/auth.js";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import { registerErrorMiddleware } from "./middleware/error.js";
// import ApiSdk from "./src/sdk";

const logger = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
      singleLine: true,
      colorize: true,
    },
  },
};

const fastify = Fastify({
  logger,
  ajv: {
    customOptions: {
      removeAdditional: "all",
    },
  },
});

await fastify.register(FastifyAuth);
await fastify.register(FastifySwagger, {
  openapi: {
    components: {
      securitySchemes: {
        token: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});
await fastify.register(FastifySwaggerUi, {
  routePrefix: "/docs",
  uiconfig: {
    docExpansion: "list",
  },
});

registerAuthMiddleware(fastify);
registerErrorMiddleware(fastify);

registerPostRoutes(fastify);
registerAuthRoutes(fastify);
registerCategoryRoutes(fastify);

// CORS ne fonctionne que sur les navigateurs (pas sur Postman)
fastify.register(FastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  await fastify.listen({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

await fastify.ready();

// const sdk = new ApiSdk({
//   baseUrl: "http://localhost:3000",
// });

// const allPosts = await sdk.getPosts();
// console.log(allPosts);
