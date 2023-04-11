import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bookings:[{
    type: mongoose.Types.ObjectId,
    ref:"Booking",
  }]
});
const User = mongoose.model("User", userSchema);
export default User;
//but in the mongodb we will see users instead of User , by default Mongodb converts them yo lowercase and pruralize them
