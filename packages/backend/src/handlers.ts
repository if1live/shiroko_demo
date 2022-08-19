import { SQSHandler, SNSHandler, ScheduledHandler } from "aws-lambda";
import serverless from "serverless-http";
import { app } from "./app.js";

export const handle_http = serverless(app.handler.bind(app));

export const handle_sqs: SQSHandler = async (event, context) => {
  console.log("aws.sqs.event", JSON.stringify(event, null, 2));
};

export const handle_sns: SNSHandler = async (event, context) => {
  console.log("aws.sns.event", JSON.stringify(event, null, 2));
};

export const handle_cron: ScheduledHandler = async (event, context) => {
  console.log("aws.scheduled.event", JSON.stringify(event, null, 2));
};
