const express = require("express");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const privateKey = require("../../config/keys").privateKey;
const passport = require("passport");

const router = express.Router();

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json("邮箱已被注册！");
    } else {
      var avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => console.log(err));
          }
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json("用户不存在！");
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const rule = {
            id: user._id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          };
          jwt.sign(rule, privateKey, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ success: true, token: "Bearer " + token });
            }
          });
        } else {
          return res.status(400).json("密码错误");
        }
      });
    }
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity
    });
  }
);

module.exports = router;
