const express=require("express");
const app=express();
const path=require("path");
require("dotenv").config();
const port=process.env.PORT || 3000;

app.use(express.static(path.resolve("src/public")));

const nunjucks=require("nunjucks");
// configure
nunjucks.configure(path.resolve('src/public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

const cars=[
    {"name": "swift", "type": "hatchback", "price":830000},
    {"name": "dzire", "type": "sedan", "price":980000},
    {"name": "ciaz", "type": "sedan", "price":1100000},
    {"name": "baleno", "type": "hatchback", "price":880000},
    {"name": "fronx", "type": "hatchback", "price":1150000},
    {"name": "brezza", "type": "suv", "price":1250000},
    {"name": "grand vitara", "type": "suv", "price":1990000},
    {"name": "alto", "type": "hatchback", "price":400000},
    {"name": "wagon r", "type": "hatchback", "price":500000},
    {"name": "jimny", "type": "suv", "price":1400000}
];


app.get("/",(req,res)=>{
    res.status(200).render("index.html",{title:"Car Blog", subtitle:"Main", car:{name:"swift", power:82}, data:["swift","alto k10","baleno"]})
});

app.get("/about",(req,res)=>{
    res.status(200).render("about.html",{title:"About Us"});
});

app.get("/cars",(req,res)=>{
    res.status(200).render("cars.html",{title:"Cars available", data:cars});
});
app.get("/cars/:car",(req,res)=>{
    const car=req.params.car.replaceAll("-"," ");

    const x=cars.filter(i=>i.name==car)[0]; 
    
    res.status(200).render("car.html",{title:x.name, data:x });
});


app.get("/**",(req,res)=>{
    res.status(404).render("error.html",{title:"404 error"})
});


app.listen(port,()=>{
    console.log(`App running at http://127.0.0.1:${port}`);
})