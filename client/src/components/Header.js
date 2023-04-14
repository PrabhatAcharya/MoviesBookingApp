import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions,adminActions } from "../store";

function Header() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [value, setValue] = useState();
    const [movies,setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logout=(isAdmin)=>{
    dispatch(isAdmin?adminActions.logout():userActions.logout());
    alert('logged out successfully');
  }
  const handleChange = (e,val)=>{
      const movie=movies.find((ele)=>ele.title===val);
      console.log(movie);
      if(isUserLoggedIn){
        navigate(`/booking/${movie._id}`);
      }
  }
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "#2b2d42", color: "orange", fontWeight: "bolder" }}
    >
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <LiveTvIcon
              sx={{ fontSize: "50px", bgcolor: "orange", borderRadius: "12px" }}
            />
            <Typography sx={{ color: "whitesmoke", marginLeft: "1rem",fontSize:"20px" }}>
              𝓑𝓸𝓸𝓴 𝓜𝔂 𝓜𝓸𝓿𝓲𝓮𝓼
            </Typography>
          </IconButton>
        </Box>
        <Box width={"50%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "White" } }}
                variant="standard"
                {...params}
                placeholder="Search Across  Movies"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="User" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add" label="AddMovie" />
                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default Header;
