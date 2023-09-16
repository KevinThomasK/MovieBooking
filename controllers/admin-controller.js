import { response } from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid input data" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existingAdmin) {
    return response.status(400).json({ message: "admin already exist" });
  }

  let admin;

  const hashPassword = bcrypt.hashSync(password);

  try {
    admin = new Admin({ email, password: hashPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "unable to store admin" });
  }

  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid input data" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "77d",
  });

  return res
    .status(200)
    .json({ message: "Authentication complete", token, id: existingAdmin._id });
};
