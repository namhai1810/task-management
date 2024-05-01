const express = require("express");
const app = express();
const database = require("./config/database");
require("dotenv").config();

const Task = require("./models/task.model");  

database.connect();
const port = process.env.PORT;

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
})

app.get("/tasks/detail/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  }catch(err){
    res.json("Task not found");
  }
})


app.listen(port, () => {
  console.log(`App listening at ${port}`);
});