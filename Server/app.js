const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT =  5000
const {JWT_SECRET,MONGOURI} =require('./config')
const
//suraj5748







mongoose.connect(MONGOURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
  console.log("connected to mongo yehhh");
})
mongoose.connection.on('error',(err)=>{
  console.log("err connecting",err);
})

require ('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


const customMiddleware =(req,res,next)=>{
  console.log("Middleware executed!");
  next()
}

app.get('/',(req,res)=>{
  console.log("home");
  res.send("hello world")
})

app.get('/about',customMiddleware,(req,res)=>{
  console.log("about");
  res.send("about page")
})

if(process.env.NODE_ENV=='production'){
  const path =require('path')

  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build'.'index.html'))
  })
}


app.listen(PORT,()=>{
  console.log("server is running on",PORT);
})
