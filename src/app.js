const express=require("express");
const app=express();
const path=require("path");
require("dotenv").config();
const port=process.env.PORT || 3000;

const compression=require("compression");
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");

function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
  
    // fallback to standard filter function
    return compression.filter(req, res)
  }

app.use(compression({ filter: shouldCompress }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(limiter);
app.use(helmet());


const session=require('express-session');
app.set('trust proxy', 1); 

app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));

const bodyParser=require('body-parser'); 
    
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// const mongoose=require("mongoose");
// const db=require('./dao');
// const [car,pin,user]=[require("./models/cars"),require("./models/pin"),require("./models/users")];

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//     done(null, user[0].id);
//   });
// passport.deserializeUser(function (user, next) {
//     next(null, user);
// });

// passport.use('local', new LocalStrategy((username, password, done) => {
    
//     user.find({ username: username }).then(user=>{
//       if( user.length==0 ){
//           return done(null, null, { message: 'No user found!' });
//       }
//       else  if (user[0].password !== password) {
//           return done(null, null, { message: 'Password is incorrect!' });
//       }
//       else{
//           return done(null, user, null);
//       }
//       })
//   }
// ));

// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       next();
//     } else {
//       res.status(403).send('Forbidden');
//     }
// }


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
    res.status(200).render("index.html",{title:"Car Blog", subtitle:"Main"});
    // car.find({},{_id:0,__v:0}).then(i=>{
    //     res.status(200).render("index.html",{title:"Car Blog", subtitle:"Main", data:i});
    // }).catch(e=>{
    //     res.status(200).render("index.html",{title:"Car Blog", subtitle:"Main", data:[{err:"no data"}]});
    // });
});

app.get("/about",(req,res)=>{
    res.status(200).render("about.html",{title:"About Us"});
});
app.get("/cars",(req,res)=>{
    res.status(200).render("cars.html",{title:"Cars"});
});

/* passport */
app.get("/login",(req,res)=>{
    res.status(200).render("login.html",{title:"Login"});
});
app.post("/login",(req,res)=>{
    passport.authenticate('local',  (err, user, info) =>{
     
        if (err) {
          res.render('login.html', { error: err, title:"Login" });
        } 
        else if (!user) {
          res.render('login.html', { errorMessage: info.message, title:"Login" });
        } 
        else {
          //setting users in session
          req.logIn(user, function (err) {
            if (err) {
              res.render('login.html', { error: err, title:"Login" });
            } else {
              res.status(200).render("add.html",{title:"Add Cars in db", name:user[0].username})
             }
          })
        }
      })(req, res);
});



// app.get("/add", isAuthenticated,(req,res)=>{
//     res.status(200).render("add.html",{title:"Add cars"});
// });

// app.get('/logout', (req, res) => { 
//     if (req.session) {
//         req.session.destroy((err)=> {
//           if(err) {
//             return next(err);
//           } else {
//               res.clearCookie('connect.sid');
//               req.logout(()=>{});
//               if (!req.user) { 
//                   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//               }
//               res.render('login.html',{ msg:"Logout Successfully"});
//           }
//         });
//       }
// });


// app.post("/add",(req,res)=>{
    
//     let data=new car({
//         _id:new mongoose.Types.ObjectId(),
//         name:req.body.name,
//         type:req.body.type,
//         price:req.body.price,
//     });

//    data.save().then(i=>res.status(200).send("data saved")).catch(i=>res.status(200).send(i));

// });


// app.get("/api",(req,res)=>{
//     car.find({},{_id:0,__v:0}).then(i=>{
//         res.status(200).json(i);
//     }).catch(e=>{
//         res.status(404).json([{error:"unknown error"}]);
//     });
// });

// app.get("/search/:car",(req,res)=>{
//     const query=req.params.car;
    
//         car.find({name:query},{_id:0,__v:0}).then(i=>{
//             res.status(200).json(i);
//         }).catch(e=>{
//             res.status(404).json([{error:"unknown error"}]);
//         });
//         // car.find({name:new RegExp(query)},{_id:0,__v:0}).then(i=>{
//         //     res.status(200).json(i);
//         // }).catch(e=>{
//         //     res.status(404).json([{error:"unknown error"}]);
//         // });
// });



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