import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.model.js";
import User from "../models/User.model.js";
import mongoose from "mongoose";
export const newBooking=async(req,res)=>{
    const {movie,date,seatNumber,user}=req.body;
    let existingMovie;
    let existingUser;
    try {
        existingMovie=await Movie.findById(movie);
        existingUser=await User.findById(user);
    } catch (error) {
        return console.error(error);
    }
    if (!existingMovie){
        return res.status(404).json({message:"Movie not found with Given Id"});

    }

    let booking;
    try {
        booking=new Bookings({movie,date:new Date(`${date}`),seatNumber,user});
        booking=await booking.save();
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();


    } catch (error) {
        return console.error(error);
    }
    if(!booking) {
        return request.status(500).json({message:"Unable to create"})
    }
    return res.status(200).json({ booking, existingMovie, existingUser });
} 
export const getBookingById = async (req, res) => {
    const id=req.params.id;
    let booking;
    let user;
    try {
        booking=await Bookings.findById(id);
         user = await User.findById(id);
    } catch (error) {
        return console.error(error);
    }
    if(!booking){
        return res.status(500).json({message:"Unexpected error"});
    }
    return res.status(200).json({ booking, user });
}
export const delteBooking = async(req, res) =>{
    const id=req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});
        await booking.user.save({session});
        session.commitTransaction();

    } catch (error) {
        return res.status(500).json({message: "unable to delte"});
    }
    return res.status(200).json({message: "successfully deleted"});
}
