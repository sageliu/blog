let mongoose=require('mongoose');
mongoose.Promise=Promise;//用es6自带的promise替换掉mongoose废弃掉的promise
let ObjectId=mongoose.Schema.Types.ObjectId;
let conn=mongoose.createConnection('mongodb://127.0.0.1/myblog');

let UserSchema=new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  avatar:String//增加一个头像的字段
})

let ArticleSchema=new mongoose.Schema({
  title:String,
  content:String,
  user:{type:ObjectId,ref:'User'},//外键，ref表示引用的User集合的主键
  createAt:{type:Date,default:Date.now}//不传的话，默认给生成一个
})
exports.User=conn.model('User',UserSchema);
exports.Article=conn.model('Article',ArticleSchema);

