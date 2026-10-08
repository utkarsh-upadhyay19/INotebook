const express =require('express');
const User=require('../models/User');
const router =express.Router();
const {body, validationResult }=require("express-validator");
const bcrypt=require("bcryptjs")
var jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()

const JWT_SECRET ='raj$good';
var fetchuser=require("../middleware/fetchuser");
//Route 1 Creating a User using: POST "api/auth/"
router.post('/', [
    body('name').isLength({min:3}).withMessage("Name should be have minimum 3 letters!!"),
    body('password').isLength({min:5}).withMessage("Password should be have minimum 5 characters!!"),
    body('email').isEmail().withMessage("Email should be have in eamil formate!!"),
], async (req, res) => {
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({success, errors: errors.array() });
    }
    let usr =await User.findOne({email:req.body.email});
    if(usr){
      success=false;
      return res.status(400).json({success,error:"Sorry!! user with this email is already exist.."})
    }

  const salt = await bcrypt.genSaltSync(10);
    const secPass =await bcrypt.hash(req.body.password, salt);
    console.log('Hashed Password:', secPass);

  usr=await User.create({
    name:req.body.name,
    password:secPass,
    email:req.body.email,
  }) 
  const data={
    usr:{
      id:usr.id
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET);
  success=true;
  res.json({success,authtoken});
    
});

//Route 2 Authentication of user using: POST "api/auth/login"
router.post('/login', [
    body('password').exists().isLength({min:5}).withMessage("Password should be have minimum 5 characters and cannot be blank!!"),
    body('email').isEmail().withMessage("Email should be have in eamil formate!!"),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const {email,password}=req.body;
  try{
    let user=await User.findOne({email})
    if(!user){
      success=false;
      return res.status(400).json({error:"incorrect credentials"})
    } 
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
      return res.status(400).json({error:"Incorrect credentials"})
    }

    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
  success=true;
  res.json({success,authtoken,email});
  }catch(error){
    console.error(error.message);
    res.status(500).send("some error occured")
  }

})

//Route 3 Getting logged in userdetails using: POST "/api/auth/Checking". Login required.
router.post('/gettinguser', fetchuser, async (req, res) => {
  try {
    userId= req.user.id
    let user=await User.findById(userId).select("-password");
    res.send(user)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  }
})

module.exports=router