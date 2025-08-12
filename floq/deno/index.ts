import { OpenAPIHono } from "@hono/zod-openapi";
// import scheduler
import { logger } from "hono/logger";
import { cors } from "hono/cors";

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

	Deno.serve(rootApp.fetch);
}
