import { FastifyPluginAsync } from "fastify";
import { Redis } from "@upstash/redis/with-fetch";
import { credentials, shiroki_origin } from "../settings.js";

const redis = new Redis({
  url: `${shiroki_origin}/runtime/upstash`,
  token: `${credentials.accessKeyId}:${credentials.secretAccessKey}`,
});

export const redisRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get("/string", async (request, reply) => {
    await redis.set("key", "value");
    let data = await redis.get("key");
    console.log(data);

    // await redis.set("key2", "value2", { ex: 1 });
    return { data };
  });
};
