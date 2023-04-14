import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import {useNavigate} from "react-router-dom";

function Auth() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onResRecived=(data)=>{
    
    dispatch(userActions.login());
    localStorage.setItem("userId",data.id)
    // console.log("Mera",data);
       alert("logged in successfully");
    navigate("/")
  }

    const getData = (data) => {
      console.log(data);
      sendUserAuthRequest(data.inputs,data.signup)
      .then(onResRecived)
      .catch((err) => {console.log(err)});
    };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
}


export default Auth
