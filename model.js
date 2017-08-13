let mongoose=require('mongoose');

let conn=mongoose.createConnection('mongodb://127.0.0.1/myblog');

let UserSchema=new mongoose.Schema({
  username:String,
  password:String,
  email:String
})

exports.User=conn.model('User',UserSchema);

