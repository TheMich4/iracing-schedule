import { router } from "./router";

const server = Bun.serve({
  port: 8000,
  fetch(req) {
    const pathname = new URL(req.url).pathname;

    if (!pathname) {
      return new Response("pathname not found");
    }

    return router[pathname](req);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
