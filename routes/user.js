let express = require('express');

let router=express.Router();

router.get('/signup',function (req,res) {

  res.send('获取注册表单')
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

