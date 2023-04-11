import express from "express";
import { delteUser, getAllUsers, getBookingsofUser, login, signup, updateUser } from "../controllers/user-controllers.js";

const userRouter=express.Router();
userRouter.get('/',getAllUsers);
userRouter.post('/signup',signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", delteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsofUser);




export default userRouter;