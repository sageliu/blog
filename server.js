let express = require('express');
let path=require('path');
//路由中间件
let index=require('./routes/index')
let user=require('./routes/user')

let app = express();
//设置模板引擎
app.set('view engine','html');
//设置模板存放路径
app.set('views',path.resolve('views'));
//设置html模板的渲染方法
app.engine('html',require('ejs').__express)

app.use('/',index);
app.use('/user',user);


app.listen(8081);//app是一个请求监听函数