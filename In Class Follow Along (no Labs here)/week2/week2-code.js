const fs = require("fs");
const path = require("path");

// fs.readFile(path.join(__dirname, "pages", "home.html"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readdir(path.join(__dirname, "pages"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readdir(path.join(__dirname, "pages"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);

//   data.forEach(page => {

//   });
// });

fs.readdir(path.join(__dirname, "pages"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);

  data.forEach((item) => {
    console.log(item);

    fs.readFile(path.join(__dirname, "pages", item), "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);
    });

  });
});
