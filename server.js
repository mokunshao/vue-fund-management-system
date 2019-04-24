const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./config/keys").MongoURI;
const users = require("./routes/api/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"), err => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users/", users);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
