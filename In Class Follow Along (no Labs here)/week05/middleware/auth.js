const auth = (req,res,next) =>{
    if (!req.query.username) return res.send("No user found")
        console.log(req.query.username)
    
        next()
}
const auth_google = (req,res,next) =>{
    if (!req.query.username) return res.send("No user found")
        console.log(req.query.username)
    
        next()
}
module.exports = auth,auth_google