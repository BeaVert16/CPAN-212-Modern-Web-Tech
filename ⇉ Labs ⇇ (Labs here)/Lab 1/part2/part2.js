const http = require("http");
const fs = require("fs");
const path = require("path");

const sendResponse = (req, res, filename) => {
  try {
    let data = fs.readFileSync(path.join(__dirname, "pages", filename));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  } catch (err) {
    console.log(err);
    res.end("Error loading page");
  }
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    sendResponse(req, res, "home.html");
  } else if (req.url === "/about") {
    sendResponse(req, res, "about.html");
  } else if (req.url === "/contact") {
    sendResponse(req, res, "contact.html");
  } else if (req.url === "/login") {
    if (req.method === "POST") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("WELCOME TO THE POST METHOD for LOGIN");
    } else {
      sendResponse(req, res, "login.html");
    }
  } else {
    sendResponse(req, res, "error.html");
  }
});

const PORT = 8000;
server.listen(PORT, () => [console.log(`http://localhost:${PORT}`)]);
