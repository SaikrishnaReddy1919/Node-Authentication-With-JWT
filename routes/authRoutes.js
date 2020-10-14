//using ES6 imports/exports
import express from "express";
import User from "../models/userModel.js";
import { loginValidation, registerValidation } from "../validation.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post("/register", (req, res) => {
  //validate before saving to db
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user is already in the db
  User.findOne({ email: req.body.email })
    .then((doc) => {
      if (doc) {
        return res.status(400).send("Email already exists.");
      }
    })
    .catch((err) => console.log(err));

  //hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  //if validation successfull add user to db
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  user
    .save()
    .then((user) => res.send({ user: user.id }))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/login", async (req, res) => {
  //validate before checking
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist.");

  //check for password match
  const correctPass = await bcrypt.compare(req.body.password, user.password);
  if (!correctPass) return res.status(400).send("Invalid Password.");

  //If everything goes well
  res.send("Login successfull.");
});

export default router;
    