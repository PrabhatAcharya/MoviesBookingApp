import {
  Dialog,
  FormLabel,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const lableStyle = { mt: 1, mb: 1 };
const AuthForm = ({ onSubmit, isAdmin }) => {
  const [isSignup, setisSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign="center">
        {isSignup ? "SignUp" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          padding={6}
          justifyContent="center"
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent="center"
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel sx={{ lableStyle }}> Name </FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />{" "}
            </>
          )}

          <FormLabel sx={{ lableStyle }}> Email </FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />

          <FormLabel sx={{ lableStyle }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "SignUp" : "Login"}
          </Button>

          {!isAdmin && (
            <Button
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
              onClick={() => setisSignup(!isSignup)}
            >
              Switch To {isSignup ? "Login" : "SignUp"}{" "}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;

// import React, { useState } from 'react'
// import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
// import CloseIcon from "@mui/icons-material/Close";

// const labelStyle = {mt:1,mb:1}
// function AuthForm() {
//     const [isSignup,setIsSignup] =useState(false)
//     const changetoSwitch=()=>{
//         setIsSignup(!isSignup);
//     }
//   return (
//     <Dialog
//       PaperProps={{ style: { borderRadius: "22px" } }}
//       sx={{ padding: "auto" }}
//       open={true}
//     >
//       <Box sx={{ ml: "auto", padding: 1 }}>
//         <IconButton>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Typography variant="h4" textAlign={"center"}>
//         Login
//       </Typography>
//       <form>
//         <Box
//           display={"flex"}
//           justifyContent={"center"}
//           flexDirection="column"
//           width={400}
//           height={"auto"}
//           margin="0px 20px 0px 20px"
//           alignContent={"center"}
//           padding={"20px"}
//         >
//           {isSignup && (
//             <>
//               <FormLabel sx={labelStyle}>Name</FormLabel>
//               <TextField
//                 margin="normal"
//                 variant="standard"
//                 type={"text"}
//                 name={"name"}
//               />
//             </>
//           )}
//           <FormLabel sx={labelStyle}>Email</FormLabel>
//           <TextField
//             margin="normal"
//             variant="standard"
//             type={"email"}
//             name={"email"}
//           />
//           <FormLabel sx={labelStyle}>Password</FormLabel>
//           <TextField variant="standard" type={"password"} name={"password"} />
//           <Button
//             sx={{ mt: 2, borderRadius: 10, backgroundColor: "#2b2d42" }}
//             variant="contained"
//             type="submit"
//             fullWidth
//           >
//             Login
//           </Button>
//           <Button
//             onClick={()=>changetoSwitch}
//             sx={{ mt: 2, borderRadius: 10 }}
//             type="submit"
//             fullWidth
//           >
//             Switch To {isSignup ? "Login" : "Signup"}
//           </Button>
//         </Box>
//       </form>
//     </Dialog>
//   );
// }

// export default AuthForm
