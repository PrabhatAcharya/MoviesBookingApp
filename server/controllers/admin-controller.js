import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
export const  addAdmin=async (req, res, next) => {
    const {email, password} = req.body;
   if (
   !email &&
   email.trim() === "" &&
   !password &&
   password.trim() === ""
 ) {
   return res.status(422).json({ message: "Invalid inputs" });
 }
    let existingAdmin;
    try {
        existingAdmin =await Admin.findOne({email})
    } catch (error) {
        return console.log(error);
    } 
    if (existingAdmin) {
        return res.status(400).json({message:"Admin already exists"});
    }
    let admin;
    const hashedPassword =bcrypt.hashSync(password);

    try {
        admin=new Admin({email,password:hashedPassword});
        admin=await admin.save();
    } catch (error) {
        return console.log(error);
    }
    if(!admin){
        return request.status(505).json({message:"Unable to create admin"});
    }
    return res.status(200).json({admin});

}
export const adminLogin = async(req, res) => {
 const { email, password } = req.body;
 if (!email && email.trim() === "" && !password && password.trim() === "") {
   return res.status(422).json({ message: "Invalid inputs" });
 }
 let existingAdmin;
 try {
    existingAdmin=await Admin.findOne({email});
 } catch (error) {
    return console.error(error);
 }
 if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
 }
 const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)
 if(!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
 }
 
 const token = jwt.sign({ id: existingAdmin._id }, process.env.SCECRET_KEY, {
   expiresIn: "7d",
 });
return res.status(200).json({ message: "Authentication successful",token,id:existingAdmin._id});
}
export const getAdmins=async(req, res, next) => {
  let admins;
  try {
    admins=await Admin.find();
  } catch (err) {
    return console.error(err); 
  }
  if(!admins){
    return res.status(500).json({message: "Internal Server Error"});
  }
  return res.status(200).json({admins});
}