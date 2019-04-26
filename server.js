const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./config/keys").MongoURI;
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const passport = require("passport");

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users/", users);
app.use("/api/profiles/", profiles);

app.get("/api/test", (req, res) => {
  res.json("You can see me now.");
});

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected"), err => console.log(err));

require("./config/passport")(passport);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
