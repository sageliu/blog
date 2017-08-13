let express = require('express');
let path=require('path');
let bodyParse=require('body-parser');

let session = require('express-session')
//这是一个消息中间件，此中间件负责向session读消息，写消息，所以要放在session后面
let flash=require('connect-flash');
//路由中间件
let index=require('./routes/index')
let user=require('./routes/user')
let app = express();
//使用bodyPaese中间件，得到请求体，会在req上增加一个body属性
app.use(bodyParse.urlencoded({extends:true}))
//使用session中间件，在请求对象上增加一个req.session属性
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:'secret'
}))
//使用了此中间件，会增加req.flash属性，
// req.flash(type)//读消息，并销毁消息，表示写入的消息只能读取一次
// req.flash(type ,msg)//写消息
app.use(flash())
app.use(function (req,res,next) {//此中间件用来给模板的公共变量赋值
//  把session的user属性取出来，赋值给模板
//  res.locals上的属性会传输到页面
  res.locals.user=req.session.user;
  //req.flash('success')取出来是一个数组
  res.locals.success=req.flash('success').toString();//对象不能在模板中直接渲染，需要转换成数组
  res.locals.error=req.flash('error').toString();
  next();
})


//设置模板引擎
app.set('view engine','html');
//设置模板存放路径
app.set('views',path.resolve('views'));
//设置html模板的渲染方法
app.engine('html',require('ejs').__express)


app.use('/',index);
app.use('/user',user);
//参数是静态文件根目录的绝对路径，当客户端访问服务器的静态文件时，此中间件会去静态文件根目录查找，如果没有，会去找自己写的文件
app.use(express.static(path.resolve('node_modules')));

app.listen(8081);//app是一个请求监听函数