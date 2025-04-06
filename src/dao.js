const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node');

const db=mongoose.connection;

db.on('error', function (err) { throw err }); 

db.once('open', function(){
  console.log('mongoose connected!');
});

module.exports=mongoose;