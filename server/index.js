import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import moviesRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();
app.use(express.json());
//middleware
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", moviesRouter);
app.use("/booking", bookingRouter);




app.use(express.json());
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

