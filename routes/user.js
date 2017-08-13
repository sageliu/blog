let express = require('express');

let router=express.Router();

router.get('/signup',function (req,res) {
  //渲染模板第一个参数是相对路径，相对于模板的根目录
  //第二个参数是给模板传的数据，模板中用<%=title%>使用
  res.render('user/signup',{title:'用户注册'})
})
router.post('/signup',function (req,res) {
  res.send()
})
router.get('/signin',function (req,res) {

})
router.post('/signin',function (req,res) {

})
router.get('/signout',function (req,res) {

})

module.exports=router;

