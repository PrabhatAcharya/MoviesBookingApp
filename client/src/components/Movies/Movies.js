import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers.js';
import MovieItem from './MovieItem';

function Movies() {
  const[movies,setMovies]=useState();
  useEffect(() => {
    getAllMovies().then((data)=>setMovies(data.movies))
    .catch((err) => console.log(err));
  },[])
  
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        varient="h4"
        margin={"auto"}
        width={"40%"}
        padding={2}
        bgcolor={"#900C3F"}
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin={"auto"}
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
           
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Movies
