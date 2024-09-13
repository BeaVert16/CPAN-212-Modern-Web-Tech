const http = require("http");
const fs = require("fs");
const path = require("path");

// const server = http.createServer((req, res) => {

//     if (req.url === "/"){
//         res.write("Welcome to the home page")
//     }
//     // console.log(req)
//     // console.log(req.params)
//     // console.log(req.query)
//     // console.log(req.body)
//     console.log(req.url)
//     console.log(req.method)

//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(
//     JSON.stringify({
//       data: "Hello World!",
//     })
//   );
// });

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to the home page");
    res.end();
  } else if (req.url === "/about") {
    res.write("Welcome to the about page");
    res.end();
  } else if (req.url === "/content") {
    res.write("Welcome to the content page");
    res.end();
  } else if (req.url === "/login") {
    if (req.method === "POST") {
      res.write("I got your data");
      res.end();
    }
    fs.readFile(
      path.join(__dirname, "pages", "login.html"),
      "utf8",
      (err, data) => {
        if (err) console.log(err);
        res.end();
        throw err;
      }
      
    );

  } else {
    res.write("Page not found");
    res.end();
  }
});
const PORT = 8000;
server.listen(PORT, () => [console.log(`http://localhost:${PORT}`)]);
