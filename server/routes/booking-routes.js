import express from 'express';
import { delteBooking, getBookingById, newBooking } from '../controllers/booking-controller.js';

const bookingRouter =express.Router();
bookingRouter.post("/", newBooking);
bookingRouter.get("/:id", getBookingById);
bookingRouter.delete("/:id", delteBooking);
export default bookingRouter;