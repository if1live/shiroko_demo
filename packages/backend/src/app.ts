import { App } from "@tinyhttp/app";
import { cors } from "@tinyhttp/cors";
import { urlencoded } from "milliparsec";
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
  noMatchHandler: (req, res) => {
    res.status(400).json({
      message: "mismatch pattern",
    });
  },
});

app.use(cors());
app.use(urlencoded());

app.use("/rds", rdsRouter);

app.get("/", async (req, res) => {
  const url = "https://if1live.github.io/shiroko_demo/";
  res.redirect(url);
});
