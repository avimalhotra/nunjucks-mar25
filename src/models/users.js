const mongoose=require('../dao');
const Schema=mongoose.Schema;

const User=new Schema({
    _id:mongoose.ObjectId,
    username:{type:String, required:true, unique: true, dropDups:true },
    password:{type:String, required:true },
},{collection:"users"});

const user=mongoose.model("user",User);

module.exports=user;