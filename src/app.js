const express=require("express");
const app=express();
const path=require("path");
require("dotenv").config();
const port=process.env.PORT || 3000;

const bodyParser=require('body-parser'); 
    
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose=require("mongoose");
const db=require('./dao');
const [car,pin]=[require("./models/cars"),require("./models/pin")];


app.use(express.static(path.resolve("src/public")));

const nunjucks=require("nunjucks");
// configure
nunjucks.configure(path.resolve('src/public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 


app.get("/",(req,res)=>{
    car.find({},{_id:0,__v:0}).then(i=>{
        res.status(200).render("index.html",{title:"Car Blog", subtitle:"Main", data:i});
    }).catch(e=>{
        res.status(200).render("index.html",{title:"Car Blog", subtitle:"Main", data:[{err:"no data"}]});
    });
   
});

app.get("/about",(req,res)=>{
    res.status(200).render("about.html",{title:"About Us"});
});

app.get("/add",(req,res)=>{
    res.status(200).render("add.html",{title:"Add cars"});
});
app.post("/add",(req,res)=>{
    
    let data=new car({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        type:req.body.type,
        price:req.body.price,
    });

   data.save().then(i=>res.status(200).send("data saved")).catch(i=>res.status(200).send(i));

});


// app.get("/cars",(req,res)=>{
//     res.status(200).render("cars.html",{title:"Cars available", data:cars});
// });
// app.get("/cars/:car",(req,res)=>{
//     const car=req.params.car.replaceAll("-"," ");

//     const x=cars.filter(i=>i.name==car)[0]; 
    
//     res.status(200).render("car.html",{title:x.name, data:x });
// });


app.get("/**",(req,res)=>{
    res.status(404).render("error.html",{title:"404 error"})
});


app.listen(port,()=>{
    console.log(`App running at http://127.0.0.1:${port}`);
})