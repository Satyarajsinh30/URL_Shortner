const shortid = require("shortid")
const URL = require("../models/url")

async function generateNewURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg:"give URL"});
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    const allUrl = await URL.find({})
    return res.redirect("/home")
}

module.exports={
    generateNewURL
}