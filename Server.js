const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
require("./config/DB");
app.use(express.json());
const port = 3000;
const Person = require("./models/User");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/users", async (req, res) => {
  try {
    const allUser = await Person.find();
    res.json(allUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new Person({ ...req.body });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const upDate = req.body;
  try {
    const findUser = await Person.findOneAndUpdate({ _id: userId }, upDate, {
      new: true,
    });
    res.json(findUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const findUser = await Person.deleteOne({ _id: userId });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
