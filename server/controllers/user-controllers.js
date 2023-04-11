import Bookings from "../models/Bookings.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async(req,res,next) =>{
    let users;
    try {
        users= await User.find();

    } catch (error) {
        return console.log(error);
    }
    if(!users){
        return res.status(500).json({message:"Unexpected error"});
    }
return res.status(200).json({users});
};
export const signup = async(req, res) => {
        const {name, email, password}=req.body;
        if(!name && name.trim() ==="" && !email && email.trim() ==="" && !password && password.trim() ===""){
            return res.status(422).json({message: "Invalid inputs"});
        }   
        let user;
        const hashedPassword = bcrypt.hashSync(password);
        try {
            user = new User({
              name,
              email,
              password: hashedPassword,
            });
           user= await user.save();

        } catch (error) {
            return console.log(error);
        }
        if(!user){
            return res.status(500).json({message: "Unexpacted error"});
        }
        return res.status(201).json({user});
};
export const updateUser =async (req, res)=>{
    const id=req.params.id;
 const { name, email, password } = req.body;
 if (
   !name &&
   name.trim() === "" &&
   !email &&
   email.trim() === "" &&
   !password &&
   password.trim() === ""
 ) {
   return res.status(422).json({ message: "Invalid inputs" });
 }
    const hashedPassword = bcrypt.hashSync(password);
 let user;
   try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
   } catch (error) {
    console.log(error);
    
   }
   if(!user){
    return res.status(500).json({message:"Something went wrong"});
   }
   return res.status(200).json({message:"Updated successfully"});


};
export const delteUser=async (req, res)=>{
    const id=req.params.id;
    let user;
    try {
        user=await User.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
     if (!user) {
       return res.status(500).json({ message: "Something went wrong" });
     }
     return res.status(200).json({ message: "Deleted successfully" });

};
export const login = async(req, res) => {
    const {email,password} = req.body;
   if (
     !email &&
     email.trim() === "" &&
     password &&
     password.trim() === ""
   ) {
     return res.status(422).json({ message: "Invalid inputs" });
   }  
   let existingUser;
   try {
    existingUser = await User.findOne({email});
   } catch (error) {
    
   }
   if(!existingUser){
    return res.status(404).json({ message: "Unable to find user from id" });
   }
   const isPasswordCorrect=bcrypt.compareSync(password, existingUser.password);

   if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid password"});
   }
   return res.status(200).json({message:"Login successful"});

}
export const getBookingsofUser = async(req, res) =>{
  const id = req.params.id;
  let bookings;
  try {
    bookings=await Bookings.find({user:id});
  } catch (error) {
    return console.error(error);
  }
  if(!bookings){
    return res.status(500).json({message:"Unable to find Booking"});
  }
  return res.status(200).json({bookings});
}


