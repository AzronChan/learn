var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/demi',function(req,res,next){
	res.send('demi');
}) 

router.get('/lsj',function(req,res,next){
	res.send('lsj');
}) 

router.get('/czl',function(req,res,next){
	res.send('czl');
}) 

module.exports = router;
