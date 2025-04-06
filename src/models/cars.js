const mongoose=require('../dao');
const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.ObjectId,
    name:{type:String, required:true, unique: true, dropDups:true },
    type:{type:String, required:true },
    price:{type:Number, required:true, min:1, max:200000000 }
},{collection:"sample"});

const car=mongoose.model("car",Car);

module.exports=car;