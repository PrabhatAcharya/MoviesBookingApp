import React from "react";
import AuthForm from "../Auth/AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";

import { adminActions } from "../../store";

function Admin() {
 
  const dispatch = useDispatch();
  const onResRecived=(data)=>{
    console.log("onResRecived-->Admin",data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
  }

  const getData = (data) => {
    console.log("Admindata", data.inputs);
    sendAdminAuthRequest(data.inputs)
      .then(onResRecived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
}

export default Admin;
