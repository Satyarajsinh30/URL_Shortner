const jwt = require("jsonwebtoken")
const secret = "skamaeta@"

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.e_mail,
        role: user.role
    }
    return jwt.sign(payload,secret)
}

function getUser(token){
    if(!token) return null
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,getUser
}