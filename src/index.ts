import { Elysia } from "elysia";
import initializeRoutes from "./routes/main";
import { initializeRepositories } from "./repositories/main";
const app = new Elysia();

initializeRepositories();
initializeRoutes(app);

app.listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
