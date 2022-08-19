import * as dotenv from "@tinyhttp/dotenv";
dotenv.config();

export const credentials = {
  accessKeyId: process.env.SHIROKO_API_KEY!,
  secretAccessKey: process.env.SHIROKO_SECRET_KEY!,
};

export const origin = process.env.SHIROKO_ORIGIN!;
