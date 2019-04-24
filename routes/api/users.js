// @login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const privateKey = require("../../config/keys").privateKey;
const passport = require("passport");
// @route POST api/users/register
// @desc 返回的请求的json数据
// @access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "邮箱已被注册！" });
    } else {
      var avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
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

// @route POST api/users/login
// @desc 返回token jwt passport
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ email: "用户不存在！" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const rule = { id: user._id, name: user.name };
          jwt.sign(rule, privateKey, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              throw err;
            } else {
              res.json({ success: true, token: "Bearer " + token });
            }
          });
        } else {
          return res.status(400).json({ password: "密码错误" });
        }
      });
    }
  });
});

// @route GET api/users/current
// @desc return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
