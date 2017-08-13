let express = require('express');

//路由中间件
let index=require('./routes/index')
let user=require('./routes/user')

let app = express();

app.use('/',index);
app.use('/user',user);

app.listen(8081);//app是一个请求监听函数