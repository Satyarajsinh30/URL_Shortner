const User = require("../models/users")
const URL = require("../models/url")
const {setUser} = require("../service/auth")
const {v4: uuidv4} = require("uuid");
const { set } = require("mongoose");
async function handleUserSignUp(req,res){
    const {name,e_mail,password} = req.body;
    await User.create({
        name,
        e_mail,
        password,
    });
    const allUrl = await URL.find({})
    return res.render("home")
}
async function handleUserLogin(req,res){
    const {e_mail,password} = req.body;
    const user = await User.findOne({
        e_mail,
        password,
    });
    if(!user){
        return res.render("login",{
            error: "Invalid Username or password"
        })
    }

     const token = setUser(user)
    res.cookie("token",token)
    const allUrl = await URL.find({})
    return res.redirect("/home")
}

module.exports = {handleUserSignUp,handleUserLogin}