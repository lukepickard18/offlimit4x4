const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4"
};

const server = http.createServer((req, res) => {
  let filePath;

  if (req.url === "/" || req.url === "/home") {
    filePath = "index.html";
  } else {
    filePath = req.url;
  }

  const fullPath = path.join(__dirname, "public", filePath);
  const ext = path.extname(fullPath);
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Off Limits 4x4 running at http://localhost:3000");
});
