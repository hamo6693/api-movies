const express = require('express');
const router = express.Router();
const controller = require("../controller/watchListController")
const auth = require("../middlewares/auth")


router.post("/",auth.check,controller.add)

router.delete("/:movie",auth.check,controller.delete)


router.get("/",auth.check,controller.list)

module.exports = router