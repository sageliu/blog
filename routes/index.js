let express = require('express');
let {Article}=require('../model')
let router=express.Router();

router.get('/',function (req,res) {
  Article.find()
    .populate('user')//填充，可以把一个外接字段从ID值，变成对应此ID的文档对象
    .sort({createAt:1})
    .limit(10)
    .exec(function (err,article) {
      if(err){
        req.flash('error',err.toString())
      }else{
        if(article.length){
          res.render('index',{title:'这是首页',article});
        }else{
          req.flash('error','未找到文章，请先发表吧')
          res.redirect('article/add')
        }
      }
    })


})

module.exports=router;



