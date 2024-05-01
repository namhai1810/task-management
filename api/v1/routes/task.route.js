const express = require("express");
const router = express.Router();
const Task =  require("../models/task.model")
const taskController = require("../controllers/task.controller")

router.get("/",taskController.index)

router.get("/detail/:id", taskController.detail)
router.patch("/change-status/:id", taskController.changeStatus)
router.patch("/change-multi", taskController.changeMulti)

module.exports = router;