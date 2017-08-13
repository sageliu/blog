let express = require('express');
let {User}=require('../model');//把model.js导出的对象，解构出来
let multer =require('multer');//仅仅用于上传文件用的
let upload=multer({dest:'./upload'})//配置上传后的文件存放到服务器的路径
//.代表当前目录，当前目录是server.js所在的目录，也就是启动服务所在的目录。这个要注意，切记切记
//没有会自动创建这个目录的
let router=express.Router();

router.get('/signup',function (req,res) {
  //渲染模板第一个参数是相对路径，相对于模板的根目录
  //第二个参数是给模板传的数据，模板中用<%=title%>使用
  res.render('user/signup',{title:'用户注册'})
})

router.post('/signup',upload.single('avatar'),function (req,res) {
  //upload.single生成一个中间件函数，负责解析请求体， avatar要和页面input file的name对应
  // 解析完之后会得到2个对象，req.body会存放文本类型的字段，req.file会存放上传后的文件信息
  let user=req.body;//先得到请求体对象，是通过bodyParse的引用生成的，详见server.js
  console.log(user);
  console.log(req.file);
  user.avatar=`/${req.file.filename}`//这个路径是/文件名，只需要把upload文件夹做完静态文件根目录，就可以在请求图片的时候，通过/文件名访问到这个文件了
  User.findOne({username:user.username},function (err,oldUser) {
    if(oldUser){
      req.flash('error','此用户名已经存在，请重新输入');
      res.redirect('back')//注册失败，跳回注册页
    }else{
      User.create(user,function (err,doc) {//通过请求体对象user把数据保存到数据库里
        if(err){
          req.flash('error',err.toString());
          res.redirect('back')//注册失败，跳回注册页
        }else {
          req.flash('success','用户注册成功，请登录！！！')
          req.flash('success','用户注册成功，请登录222！！！')//不会覆盖前面的
          res.redirect('/user/signin')//注册成功，跳转到登录页
        }
      })
    }
  })

})
router.get('/signin',function (req,res) {
  // get中写的为什么不生效？？？
  res.render('user/signin',{title:'用户登录',success:'请登录！！'})
})
router.post('/signin',function (req,res) {
  let user=req.body;
  User.findOne(user,function (err,doc) {
    if(err){
      req.flash('error',err.toString())
      res.redirect('back')
    }else{
      if(doc){
        req.flash('success','恭喜你登录成功')
        //
        req.session.user=doc;
        res.redirect('/')
      }else{
        req.flash('error','账号或密码输入有误，请重新输入')
        res.redirect('back')
      }
    }
  })
  // selectUser(user,'/')
})
router.get('/signout',function (req,res) {
  req.session.user=null;//把会话对象中的user属性重置为null,则意味着退出
  res.redirect('/user/signin')
})

module.exports=router;

