import React, { useEffect, useState } from 'react'

import {Box, Button,  Typography} from '@mui/material'
import MovieItem from './Movies/MovieItem';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';

function HomePage() {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies)).catch((error)=>console.log(error));
  },[])
  // console.log(movies);
  return (
    <Box
      sx={{ bgcolor: "smokewhite" }}
      width={"100%"}
      height={"100%"}
      margin="auto"
      marginTop={2}
    >
      <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
        <img
          src="https://c4.wallpaperflare.com/wallpaper/716/768/969/anime-naruto-itachi-uchiha-sasuke-uchiha-wallpaper-preview.jpg"
          alt="Itachi"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage
