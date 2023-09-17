import express from 'express';
import { addMovie, getMovies, getMovieById } from '../controllers/movie-controllers.js';


const movieRouter = express.Router();

movieRouter.get("/",getMovies)
movieRouter.get("/:id",getMovieById)
movieRouter.post("/",addMovie)

export default movieRouter;