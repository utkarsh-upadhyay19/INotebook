const mongoose = require("mongoose");
const dotenv=require('dotenv')
dotenv.config()
const mongoURI = "mongodb+srv://raj_upar:raj123@cluster0.q4mjm5w.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Cluster0;" 

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