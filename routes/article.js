let express = require('express');
let {Article} =require('../model')
let router=express.Router();

router.get('/add',function (req,res) {
  res.render('article/add',{title:'发表文章',article:{}})
})
router.post('/add',function (req,res) {
  let article=req.body;
  article.user=req.session.user._id;
  Article.create(article,function (err,doc) {
    if(err){
      req.flash('error',err.toString())
      res.redirect('back');
    }else{
      req.flash('success','发表文章成功')
      res.redirect('/')
    }
  })
})

router.get('/detail/:_id',function (req,res) {
  let _id=req.params._id;//先得到路径参数
  Article.findById(_id,function (err,article) {
    if(err){
      req.flash('error',err.toString())
    }else{
      res.render('article/detail',{title:'文章详情',article})
    }
  })
});
router.get('/delete/:_id',function (req,res) {
  let _id=req.params._id;
    Article.remove({_id},function (err,result) {
      if(err){
        req.flash('error',err.toString())
      }else{
        console.log(result.result);
        // res.send('[]')
        res.redirect('/')
      }
    })
})
router.get('/edit/:_id',function (req,res) {
  let _id=req.params._id;
  Article.findById({_id},function (err,article) {
    res.render('article/add',{title:'编辑文章',article});

  })
})
router.post('/edit/:_id',function (req,res) {
  let _id=req.params._id;

  Article.update({_id},req.body,function (err,result) {
    res.redirect(`/article/detail/${_id}`)
  })
})

module.exports=router;
