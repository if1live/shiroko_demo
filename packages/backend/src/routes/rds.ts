import type {
  ExecuteStatementCommandInput,
  ExecuteStatementCommandOutput,
} from "@aws-sdk/client-rds-data";
import { FastifyPluginAsync } from "fastify";
import { ExecuteStatementCommand, MyClient } from "../sdk/index.js";
import { credentials, shiroki_origin } from "../settings.js";

const rds = new MyClient({
  endpoint: `${shiroki_origin}/runtime/dataapi/api`,
  credentials,
});

const resourceArn = "sample-resourceArn";
const secretArn = "sample-secretArn";
const database = "sample-database";

export const rdsRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get("/execute-statement", async (request, reply) => {
    const input: ExecuteStatementCommandInput = {
      resourceArn,
      secretArn,
      database,
      sql: "select $1::integer + $2::integer as a, NOW() as b",
      parameters: [
        {
          name: "a",
          value: { longValue: 1 },
        },
        {
          name: "b",
          value: { longValue: 2 },
        },
      ],
    };
    const command = new ExecuteStatementCommand(input);
    const output: ExecuteStatementCommandOutput = await rds.send(command);

    return {
      input,
      output,
    };
  });
};
