const express = require("express")
const router = express.Router();
const {checkForAuthentication,restrictTo} = require("../middleware/auth")
const URL = require("../models/url")

router.get("/admin/urls",restrictTo(["ADMIN"]),async (req,res)=>{
    const allUrl = await URL.find({})
    const shortId = req.user.shortId
    const user = req.user
    return res.render("home",{
        urls: allUrl,
        id: shortId,
        user: user
    })
})

router.get("/",restrictTo(["NORMAL","ADMIN"]), async (req,res)=>{
    const allUrl = await URL.find({createdBy: req.user._id})
    const shortId = req.user.shortId
    const user = req.user
    return res.render("home",{
        urls: allUrl,
        id: shortId,
        user: user
    })
})
router.get("/sign_up",(req,res)=>{
    return res.render("sign_up")
})
router.get("/login",(req,res)=>{
    return res.render("login")
})
module.exports= router