import { OpenAPIHono } from "@hono/zod-openapi";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const rootApp = new OpenAPIHono();
// Global middleware
rootApp
    .use(
        cors({
            origin: "*",
        })
    )
    .use(logger());

const server = serve(rootApp.fetch);

// graceful shutdown
process.on('SIGINT', () => {
    server.close()
    process.exit(0)
})
process.on('SIGTERM', () => {
    server.close((err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        process.exit(0)
    })
})