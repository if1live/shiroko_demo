import type {
  ExecuteStatementCommandInput,
  ExecuteStatementCommandOutput,
} from "@aws-sdk/client-rds-data";
import type {
  DeleteConnectionCommandInput,
  DeleteConnectionCommandOutput,
  GetConnectionCommandInput,
  GetConnectionCommandOutput,
  PostToConnectionCommandInput,
  PostToConnectionCommandOutput,
} from "@aws-sdk/client-apigatewaymanagementapi";
import type {
  SendMessageBatchCommandInput,
  SendMessageBatchCommandOutput,
  SendMessageCommandInput,
  SendMessageCommandOutput,
} from "@aws-sdk/client-sqs";
import type {
  PublishCommandInput,
  PublishCommandOutput,
} from "@aws-sdk/client-sns";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";

export abstract class BaseCommand<TIn, TOut> {
  readonly __input_type!: TIn;
  readonly __output_type!: TOut;

  abstract get method(): Method;
  abstract get path(): string;

  constructor(public readonly input: TIn) {}
}

// rds data
export class ExecuteStatementCommand extends BaseCommand<
  ExecuteStatementCommandInput,
  ExecuteStatementCommandOutput
> {
  public get method(): Method {
    return "POST";
  }
  public get path() {
    return "/ExecuteStatement";
  }
}

// sqs
export class SendMessageCommand extends BaseCommand<
  SendMessageCommandInput,
  SendMessageCommandOutput
> {
  public get method(): Method {
    return "POST";
  }
  public get path() {
    return "/SendMessage";
  }
}

export class SendMessageBatchCommand extends BaseCommand<
  SendMessageBatchCommandInput,
  SendMessageBatchCommandOutput
> {
  public get method(): Method {
    return "POST";
  }
  public get path() {
    return "/SendMessageBatch";
  }
}

// sns
export class PublishCommand extends BaseCommand<
  PublishCommandInput,
  PublishCommandOutput
> {
  public get method(): Method {
    return "POST";
  }
  public get path() {
    return "/Publish";
  }
}

// api gateway management api
export class PostToConnectionCommand extends BaseCommand<
  PostToConnectionCommandInput,
  PostToConnectionCommandOutput
> {
  public get method(): Method {
    return "POST";
  }
  public get path() {
    return `/@connections/${this.input.ConnectionId}`;
  }
}

export class DeleteConnectionCommand extends BaseCommand<
  DeleteConnectionCommandInput,
  DeleteConnectionCommandOutput
> {
  public get method(): Method {
    return "DELETE";
  }
  public get path() {
    return `/@connections/${this.input.ConnectionId}`;
  }
}

export class GetConnectionCommand extends BaseCommand<
  GetConnectionCommandInput,
  GetConnectionCommandOutput
> {
  public get method() {
    return "GET" as const;
  }
  public get path() {
    return `/@connections/${this.input.ConnectionId}`;
  }
}
