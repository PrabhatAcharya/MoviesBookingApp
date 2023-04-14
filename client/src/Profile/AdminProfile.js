import React, { Fragment, useEffect, useState } from "react";
import {
  getAdminById,
} from "../api-helpers/api-helpers";
import {
  Box,
  ListItem,
  Typography,
  List,
  ListItemText,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";


function AdminProfile() {
  
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log("Admin-->",admin);
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {admin && (
          <Box
            width={"30%"}
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            padding={3}
          >
            <SentimentSatisfiedAltIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={2}
              width={"60%"}
              textAlign={"centre"}
              border={"1px solid grey"}
              borderRadius={6}
            >
              Email:{admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"Helvetica"}
              textAlign={"center"}
              padding={2}
            >
              Added Movies
            </Typography>
            <Box
              margin={"auto"}
              display={"flex"}
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie:{movie.title}
                    </ListItemText>
                
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
}

export default AdminProfile;
