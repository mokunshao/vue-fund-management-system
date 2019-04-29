const express = require("express");
const passport = require("passport");
const Profile = require("../../models/Profile");
const router = express.Router();

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileField = {};
    if (req.body.type) {
      profileField.type = req.body.type;
    }
    if (req.body.description) {
      profileField.description = req.body.description;
    }
    if (req.body.income) {
      profileField.income = req.body.income;
    }
    if (req.body.expense) {
      profileField.expense = req.body.expense;
    }
    if (req.body.cash) {
      profileField.cash = req.body.cash;
    }
    if (req.body.remark) {
      profileField.remark = req.body.remark;
    }
    new Profile(profileField).save().then(profile => res.json(profile));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find().then(
      profile => {
        if (!profile) {
          return res.status(400).json("没有任何内容");
        } else {
          res.json(profile);
        }
      },
      err => {
        res.status(400).json(err);
      }
    );
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id }).then(
      profile => {
        if (!profile) {
          return res.status(400).json("没有任何内容");
        } else {
          res.json(profile);
        }
      },
      err => {
        res.status(400).json(err);
      }
    );
  }
);

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileField = {};
    if (req.body.type) {
      profileField.type = req.body.type;
    }
    if (req.body.description) {
      profileField.description = req.body.description;
    }
    if (req.body.income) {
      profileField.income = req.body.income;
    }
    if (req.body.expense) {
      profileField.expense = req.body.expense;
    }
    if (req.body.cash) {
      profileField.cash = req.body.cash;
    }
    if (req.body.remark) {
      profileField.remark = req.body.remark;
    }
    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileField },
      { new: true }
    ).then(profile => res.json(profile), err => res.json(err));
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
      .then(profile => profile.save().then(profile => res.json(profile)))
      .catch(err => res.status(400).json("删除失败"));
  }
);

module.exports = router;
