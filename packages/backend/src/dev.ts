import { init } from "./app.js";

const port = 3000;
const start = async () => {
  const app = init();
  try {
    await app.listen({ port });
    console.log(`server listening on ${port}`);
  } catch (err) {
    console.error(err);
    app.log.error(err);
    process.exit(1);
  }
};

// 로컬 개발할때는 http 서버로 돌면 편할듯
if (!process.env.LAMBDA_TASK_ROOT) {
  start();
}
