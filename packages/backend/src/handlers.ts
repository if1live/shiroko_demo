import serverless from "serverless-http";
import { app } from "./app.js";

export const handle_http = serverless(app.handler.bind(app));
