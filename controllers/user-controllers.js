import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid input data" });
  }

  let user;
  try {
    user = new User({ name, email, password });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    res.status(500).json({ message: "Unexpected error" });
  }
  return res.status(201).json({ user });
};
