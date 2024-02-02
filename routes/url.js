const express = require("express")
const router = express.Router();
const {generateNewURL} = require("../controllers/url")

router.post("/",generateNewURL);

module.exports= router