import { SQSHandler, SNSHandler, ScheduledHandler } from "aws-lambda";
import { default as awsLambdaFastify } from "@fastify/aws-lambda";
import { init } from "./app.js";

const proxy = awsLambdaFastify(init());
export const handle_http = proxy;

export const handle_sqs: SQSHandler = async (event, context) => {
  console.log("aws.sqs.event", JSON.stringify(event, null, 2));
};

export const handle_sns: SNSHandler = async (event, context) => {
  console.log("aws.sns.event", JSON.stringify(event, null, 2));
};

export const handle_cron: ScheduledHandler = async (event, context) => {
  console.log("aws.scheduled.event", JSON.stringify(event, null, 2));
};
