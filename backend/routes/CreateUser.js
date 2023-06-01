require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/Users");
app.use(express.json());

router.post(
  "/createuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name", "Invalid Name").isLength({ min: 5 }),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPassword,
      });

      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const email = req.body.email;
      const password = req.body.password;

      const emailFound = await User.findOne({ email: email });

      if (emailFound) {
        const getPassword = emailFound.password;
        const isMatch = await bcrypt.compare(password, getPassword);

        if (!isMatch) {
          return res
            .status(400)
            .json({ error_message: "Try logging with valid credentials" });
        } else {
          const userData = {
            user: {
              id: emailFound.id,
            },
          };
          const authToken = await jwt.sign(userData, process.env.SECRET_KEY);
          return res.json({ success: true, authToken: authToken });
        }
      } else {
        return res
          .status(400)
          .json({ error_message: "Try logging with valid credentials" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
