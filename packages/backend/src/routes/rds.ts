import type {
  ExecuteStatementCommandInput,
  ExecuteStatementCommandOutput,
} from "@aws-sdk/client-rds-data";
import { App } from "@tinyhttp/app";
import { ExecuteStatementCommand, MyClient } from "../sdk/index.js";
import { credentials, shiroki_origin } from "../settings.js";

const rds = new MyClient({
  endpoint: `${shiroki_origin}/runtime/dataapi/api`,
  credentials,
});

const router = new App();

const resourceArn = "sample-resourceArn";
const secretArn = "sample-secretArn";
const database = "sample-database";

router.get("/execute-statement", async (req, res) => {
  const input: ExecuteStatementCommandInput = {
    resourceArn,
    secretArn,
    database,
    sql: "select $1::integer + $2::integer",
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

  res.json({
    input,
    output,
  });
});

export const rdsRouter = router;
