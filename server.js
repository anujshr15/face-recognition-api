const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt-nodejs");
const cors=require("cors");

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'smisthebest',
    database : 'smartbrain'
  }
});

const register=require('./collectors/register.js');
const signin=require('./collectors/signin.js');
const image=require('./collectors/image.js');
const profile=require('./collectors/profile.js');




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.post("/register",(req,res)=>{register.registerHandler(req,res,bcrypt,db)});
app.post("/signin",(req,res)=>{signin.signinHandler(req,res,bcrypt,db)});
app.put("/image",(req,res)=>{image.imageHandler(req,res,db)});
app.get("/profile/:id",(req,res)=>{profile.profileHandler(req,res,db)});
app.post("/imageurl",(req,res)=>{image.handleAPICall(req,res)});

app.listen(3000);