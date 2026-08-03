import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const root = process.cwd();
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

createServer((request, response) => {
  const pathname = request.url === "/" ? "/index.html" : request.url;
  const file = join(root, pathname.split("?")[0]);

  if (!existsSync(file)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "Content-Type": mime[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
}).listen(3000, "127.0.0.1", () => {
  console.log("Local: http://127.0.0.1:3000");
});
