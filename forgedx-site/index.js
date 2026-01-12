const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath;

  // ROUTING
  if (req.url === "/" || req.url === "/home") {
    filePath = "home.html";
  } else if (req.url === "/about" || req.url === "/about.html") {
    filePath = "about.html";
  } else {
    filePath = req.url.replace("/", "");
  }

  const fullPath = path.join(__dirname, "public", filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("ForgedX running at http://localhost:3000");
});
