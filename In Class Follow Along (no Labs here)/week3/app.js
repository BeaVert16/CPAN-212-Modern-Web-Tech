require('dotenv').config()
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path')

//middleware
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    console.log(req.url)
    console.log(req.method)
    console.log(req.params)
    console.log(req.query)
    console.log(req.body)

    res.sendFile(path.join(__dirname, 'views', 'home.html'))
})

app.get("/watch", (req, res)=>{
    console.log(req,query)
    console.log(req.params)
})

// app.get("/about", (req,res) =>{
//     res.sendFile(path.join(__dirname, 'views', 'about.html'))
// })

// app.get("/contact", (req,res) =>{
//     res.sendFile(path.join(__dirname, 'views', 'contact.html'))
// })

app.get("/login", (req,res) =>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.post("/login", (req,res) =>{
    console.log(req.params)
    console.log(req.query)
    console.log(req.body)
    res.send("date received")
})

app.use("", (req,res) =>{
    res.status(404).send("Page Not Found")
})
// app.post()
// app.put()
// app.delete()

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`)
})