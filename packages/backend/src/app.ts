import { default as Fastify } from "fastify";
import { default as cors } from "@fastify/cors";
import { default as formbody } from "@fastify/formbody";
import { rdsRouter } from "./routes/rds.js";
import { redisRouter } from "./routes/redis.js";

export function init() {
  const fastify = Fastify({});

  fastify.register(cors, {});
  fastify.register(formbody, {});

  fastify.register(rdsRouter, { prefix: "/rds" });
  fastify.register(redisRouter, { prefix: "/redis" });

  fastify.get("/", async (request, reply) => {
    const url = "https://if1live.github.io/shiroko_demo/";
    reply.redirect(url);
  });

  fastify.all("/dump", async (request, reply) => {
    const data = {
      query: request.query,
      params: request.params,
      body: request.body,
    };
    console.log(JSON.stringify(data, null, 2));
    return {};
  });

  return fastify;
}
