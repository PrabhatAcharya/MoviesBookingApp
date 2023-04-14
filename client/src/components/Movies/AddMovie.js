import {
    Box,
  Checkbox,
  Typography,
  FormLabel,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const labelProps = {
    mt:1,
    mb:1,
}
const AddMovie = () => {
  const navigate = useNavigate();
    const [inputs,setInputs]=useState({
        title:"",
        description:"",
        posterUrl:"",
        releaseDate:"",
        featured:false,
    });
    const [actors,setActors]=useState([])
    const [actor,setActor]=useState("")
    const handleChnage=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,

        }));
    }
    const handleSubmit=(e)=>{
    e.preventDefault();
        console.log(inputs,actors);
    addMovie({...inputs,actors}).then(res=>{
      console.log(res);
      
      alert("Movies added successfully")
      navigate("/user-admin");
    }).catch(err=>{
      console.log(err)
    });
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography  textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChnage}
            name="title"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChnage}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChnage}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
          type="date"
            value={inputs.releaseDate}
            onChange={handleChnage}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField value={actor} name="actor" variant="standard" margin="normal" onChange={(e)=>{setActor(e.target.value)}} />
            <Button onClick={()=>{setActors([...actors, actor]);setActor("")}}>Add</Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox

            name="featured"
            checked={inputs.featured}
            onClick={(e)=>setInputs((prevState)=>({...prevState,featured:e.target.checked}))}
            sx={{ mr: "auto" }}
          />
          <Button
          type="submit"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "green",
              },
            }}
            variant="contained"
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AddMovie
