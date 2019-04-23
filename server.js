const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

// mongoose.connect('')

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
