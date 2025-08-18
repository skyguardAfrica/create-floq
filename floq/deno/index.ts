import process from "node:process";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import tasks from "../src/main.ts";
import { createRoute } from "@floq/floq";
import scheduler from "@floq/scheduler";

if (import.meta.main) {
  const rootApp = new OpenAPIHono();
  // Global middleware
  rootApp
    .use(
      cors({
        origin: "*",
      })
    )
    .use(logger());

  // Add app route
  const clientApp = createRoute(tasks);
  rootApp.route("/", clientApp);

  scheduler.startScheduler();
  const server = Deno.serve(rootApp.fetch);

  // graceful shutdown
  process.on('SIGINT', () => {
    server.shutdown();
    process.exit(0)
  })
  process.on('SIGTERM', () => {
    server.shutdown()
      .then(() => process.exit(0))
      .catch((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
      })
  })
}
