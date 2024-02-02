const express = require("express")
const path = require("path");
const URL = require("./models/url")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticrouter")
const {connectMongodb}=require("./connection")
const userRouter = require("./routes/user")
const cookie = require("cookie-parser")
const {checkForAuthentication,restrictTo} = require("./middleware/auth")
const app = express()
const port = 8001

//setting ejs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

connectMongodb("mongodb://127.0.0.1:27017/short_url").then(()=>console.log("mongodb connected"))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookie())
app.use(checkForAuthentication)

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute)
app.use("/home",staticRoute)
app.use("/user",userRouter)

app.get("/home/:ShortId", async (req, res) => {
    const shortID = req.params.ShortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortID,
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectUrl);

});

//listen
app.listen(port,()=>{
    console.log(`Server Started at port: ${port}`)
})