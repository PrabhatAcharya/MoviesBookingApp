import express from "express";
import { addMovie, getAllMovies, getMovieById } from "../controllers/movie-controller.js";

const moviesRouter=express.Router();
moviesRouter.get("/", getAllMovies);
moviesRouter.get("/:id", getMovieById);
moviesRouter.post("/", addMovie);
export default moviesRouter;