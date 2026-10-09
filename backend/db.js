const mongoose = require("mongoose");
const dotenv=require('dotenv')
dotenv.config()
const mongoURI = process.env.MONGODB_ATLAS_URL; 

const connectToMongoose = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("Mongo connected successfully...")
    })
    .catch((err)=>{
        console.error("failed to connect",err)
    })
};

module.exports = connectToMongoose;