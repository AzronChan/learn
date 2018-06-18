var express = require('express');
var router = express.Router(),
	util = require('../models/util'),
	user = require('../models/user'),
	errorBase = require('../models/error-base');

function errHandle(res,obj){
	if (!obj) return;
	res.send({
		status : 0,
		data: {},
		errorcode : errorBase[obj.errorName].errorCode,
		errormsg : errorBase[obj.errorName].errorMsg
	})
}

/* GET home page. */
router.get('/', function(req, res, next) {
		res.render('login');
});

/*
 * 登录
 */
router.get('/signin',function(req,res,next){
	console.log(req.query,typeof req.query);
	if (!util.isEmptyObject(req.query)){
		res.send(JSON.stringify({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		}))
	} else {
		res.send(JSON.stringify({
				status : 1,
				data: {},
				errorcode : 0,
				errormsg : '登录成功'
		}))
	}
})

/*
 * 注册
 */
router.get('/signup',function(req,res,next){
	let data = req.query;
	if (!data.username || !data.password || !data.age || !data.address || !data.tel){
		res.send({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		})
		return;
	}
	user.findOne({username : data.username},function(err,doc){
		console.log(err,doc);
		if (doc){
			res.send({
				status : 0,
				data: {},
				errorcode : 0,
				errormsg : '用户名已被注册'
			})
		} else {
			// 保存到数据库
			console.log(data)
            user.create(data, function (err, doc) {
               	res.send({
					status : 1,
					data: {},
					errorcode : 0,
					errormsg : ''
				})
            })
		}
	})
})

/*
 * 请求卡信息
 */
router.get('/getMyCard',function(req,res,next){
	let data = req.query;
	if (!data.username){
		res.send({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		})
		return;
	}
	user.findOne({username : data.username},function(err,obj){
		if (obj){
			if (obj.cards){
				res.send({
					status : 1,
					data: obj.cards,
					errorcode : 0,
					errormsg : ''
				})
			}
		} else {
			
			
		}
	})
})

/*
 * 创建卡片
 */
router.get('/creatMyCard',function(req,res,next){
	let data = req.query;
	if (!data.username || !data.card){
		res.send({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		})
	}
	user.findOne({username : data.username},function(err,obj){
		if (obj){
			let cards = obj.cards,id = Math.random().toString().substr(3,4) + '' + new Date().getTime().toString().substr(3,4);
			for (var i = 0; i < cards.length; i++){
				if (cards[i].id == id){
					id = Math.random().toString().substr(3,4) + '' + new Date().getTime().toString().substr(3,4);
				}
			}
			if (cards.length >= 50){
				return errHandle(res,{
					errorName : 'creatCardLimit'
				})
			}
			data.card.useStatus = 1;
			data.card.id = id;
			cards.push(data.card);
			user.updateOne({
				username : data.username
			},{cards : cards},function(err,res1){
				if (res1 && res1.ok == 1){
					res.send({
						status : 1,
						data: {},
						errorcode : 0,
						errormsg : ''
					})
				} else {
					return errHandle(res,{
						errorName : 'creatCardErr'
					})
				}
			})
		} else {
			return errHandle(res,{
				errorName : 'userNotfind'
			})
		}
	})
})

module.exports = router;