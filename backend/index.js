const connectToMongoose=require('./db');
const express = require('express')
var cors =require('cors')
connectToMongoose();

const app = express()
const port = 5000


app.use(cors())
app.use(express.json())

app.use('/api/auth', (req, res, next) => {
  console.log('Auth route middleware triggered');
  next();
})
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note',require('./routes/note'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
