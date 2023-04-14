import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  Toolbar,
  Box,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions,adminActions } from "../store";

function Header() {
  const dispatch=useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  const [value, setValue] = useState(0);
    const [movies,setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logout=(isAdmin)=>{
    dispatch(isAdmin?adminActions.logout():userActions.logout());
  }
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d43" }}>
      <Toolbar>
        <Box width={"20%"}>
          <LiveTvIcon />
        </Box>
        <Box width={"50%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
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
                <Tab LinkComponent={Link} to="/auth" label="Auth" />
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
                <Tab LinkComponent={Link} to="/admin" label="Profile" />
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
