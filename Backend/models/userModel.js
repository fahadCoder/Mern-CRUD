const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    salary:Number,
    city:String

});

module.exports=mongoose.model('User',UserSchema);