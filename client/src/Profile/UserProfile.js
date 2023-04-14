import React, { Fragment, useEffect,useState } from 'react'
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import { Box,IconButton, ListItem, Typography, List, ListItemText } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import DeleteIcon from "@mui/icons-material/Delete";

function UserProfile() {
  const [bookings,setBooking] = useState();
  const [user,setUser]=useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBooking(res.bookings))
      .catch((err) => {
        console.error(err);
      });
      getUserDetails()
        .then((res) => setUser(res.user))
        .catch((err) => {
          console.error(err);
        });
  }, [bookings]);
  // console.log(booking);
  const handleDelete=(id)=>{
deleteBooking(id).then((res)=>console.log(res)).catch(err=>{console.error(err)});
  }
  return (
    <Box width={"100%"} display="flex">
      
        <Fragment>
         { user && (<Box
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
              marginBottom={"2%"}
            >
              Name:{user.name}
            </Typography>
            <Typography
              padding={2}
              width={"60%"}
              textAlign={"centre"}
              border={"1px solid grey"}
              borderRadius={6}
            >
              Email:{user.email}
            </Typography>
          </Box>)}
          {bookings && <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"Helvetica"}
              textAlign={"center"}
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display={"flex"}
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
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
                      Movie:{booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      SeatNo:{booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Date:{new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton onClick={()=>handleDelete(booking._id)}
                      sx={{ margin: 1, width: "auto", textAlign: "left",color:"red" }}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>}
        </Fragment>
 
    </Box>
  );
}

export default UserProfile
