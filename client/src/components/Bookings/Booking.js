import React, { Fragment, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';

import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

function Booking() {
    const [movie, setMovie]=useState();
    const [inputs, setInputs]=useState({seatNumber:"",date:""});
    const id=useParams().id;
    console.log("Id",id)
    useEffect(() =>{
        getMovieDetails(id).then((res) => setMovie(res.movie)).catch((err) =>console.log(err));
    },[id]);
    console.log("BokingPage",movie);
      const handleChange=(e)=>{
        setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value
          
        }));
      }

      const handleSubmit=(e)=>{
        e.preventDefault();
      //  console.log(inputs);
       newBooking({...inputs,movie:movie._id})
       .then((res)=>console.log(res))
       .catch((err)=>console.log(err))

      }

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily={"fantasy"}
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets of Movie:{movie.title}
          </Typography>
          <Box display={"flex"} justifyContent="center">
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                width={"60%"}
                height={"300px"}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontStyle={"bold"} marginTop={1}>
                  Actors & Actress : {movie.actors.map((actor) => actor + " ,")}
                </Typography>
                <Typography fontStyle={"bold"} marginTop={1}>
                  ReleaseDate : {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    name="seatNumber"
                    variant="standard"
                    type="number"
                    margin="normal"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    variant="standard"
                    type="date"
                    value={inputs.date}
                    margin="normal"
                    onChange={handleChange}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
}

export default Booking
