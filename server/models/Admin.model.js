import mongoose from "mongoose";

const Schema = mongoose.Schema;
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  addedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref:"Movie",
    },
  ],
});
const Admin=mongoose.model('Admin',adminSchema);
export default Admin;
