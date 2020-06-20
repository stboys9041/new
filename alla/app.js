const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const bodyparser=require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useUnifiedTopology: true, useNewUrlParser: true})
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email:String,
    address:String
});
var Contact = mongoose.model('Contact', contactSchema);  

app.use('/static', express.static("static"));
app.use(express.urlencoded());

app.set("view engine"," pug");
app.set("views",path.join(__dirname,"views"));

app.get("/", (req,res)=>{
    const params = { };
    res.status(200).render("home.pug",params);
});

app.get("/contact", (req,res)=>{
    const params = { };
    res.status(200).render("contact.pug",params);
});
app.post("/contact", (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this items are saved to database")
});
})

app.listen(port,()=>{
    console.log(`Application started successfully on port ${port}`);
})
