const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();

const task = require("../models/taskModel");

const app = express();

app.use(express.json());

mongoDbURL = process.env.MONGO_DB;
serverPORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World Again!");
});

//post task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = await task.create(req.body);
    res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    res.body.status(400).json({ error: error });
  }
});
//get tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.body.status(400).json({ error: error });
  }
});
//get task by id
app.get("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await task.findById(id);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.body.status(400).json({ error: error });
  }
});

//update task by id
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

//delete task by id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

mongoose.mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(serverPORT, () => {
      console.log("Server is up and listening on 3000...");
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB..."));
