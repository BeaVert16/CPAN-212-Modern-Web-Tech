const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const logger = require("./middleware/logger")
const {auth} = require("./middleware/auth")
 
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger)
  
// routes
app.get("/", auth, (req, res)=>{
    
    res.send("Welcome to our server")
})

app.get("/about", (req, res)=>{
    res.send("Welcome to our server - about")
})
app.get("/content", (req, res)=>{
    res.send("Welcome to our server")
}) 
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});