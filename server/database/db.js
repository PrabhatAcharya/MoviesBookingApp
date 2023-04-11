import mongoose from "mongoose";

async function Connection(username, password) {
  const URL = `mongodb+srv://${username}:${password}@moviesbookingapp.cfretbn.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established");
  } catch (error) {
    console.log("Error connecting", error);
  }
}
export default Connection;
