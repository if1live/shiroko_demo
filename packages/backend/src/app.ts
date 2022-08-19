import { App, Request, Response } from "@tinyhttp/app";
import { rdsRouter } from "./routes/rds.js";

export const app = new App({
  onError: (err, req, res) => {
    if (err instanceof Error) {
      const error = {
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
      res.status(400).json(error);
    } else {
      res.status(500).json(err);
    }
  },
  noMatchHandler: (req: Request, res: Response) => {
    res.status(400).json({
      message: "mismatch pattern",
    });
  },
});

app.get("/status/ok", async (req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use("/rds", rdsRouter);
