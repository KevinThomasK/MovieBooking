import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "token not found" });
  }

  let adminId;

  //verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl
    });
    movie = await movie.save();
  } catch (error) {
    return console.log(error);
  }

  if (!movie) {
    res.status(500).json({ message: "request failed" });
  }

  return res.status(201).json({ movie });
};