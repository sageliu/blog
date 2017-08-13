let express = require('express');
let {User}=require('../model');//把model.js导出的对象，解构出来
let router=express.Router();

router.get('/signup',function (req,res) {
  //渲染模板第一个参数是相对路径，相对于模板的根目录
  //第二个参数是给模板传的数据，模板中用<%=title%>使用
  res.render('user/signup',{title:'用户注册'})
})
function selectUser(user,path,boo=false) {
  if(boo)user=user.username;

}
router.post('/signup',function (req,res) {
  let user=req.body;//先得到请求体对象，是通过bodyParse的引用生成的，详见server.js
  console.log(user);
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

