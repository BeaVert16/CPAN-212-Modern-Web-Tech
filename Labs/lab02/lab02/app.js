const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to our server");
});

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`)
});