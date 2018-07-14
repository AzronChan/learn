var express = require('express');
var router = express.Router(),
	util = require('../models/util'),
	user = require('../models/user'),
	cardIdCounter = require('../models/cardIdCounter'),
	errorBase = require('../models/error-base');

Date.prototype.format = function(format) {
    var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
          format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
        return format;
}


/**
 * @description 处理请求失败函数
 * @param {Object} res express res
 * @param {Object} obj 错误信息对象
 */
function errHandle(res,obj){
	if (!obj) return;
	res.send({
		status : 0,
		data: {},
		errorcode : errorBase[obj.errorName].errorCode,
		errormsg : errorBase[obj.errorName].errorMsg
	})
}


/**
 * @description ID生成器
 * @param {String} sequenceName 自增器名称
 */
function getNextSequenceValue(sequenceName,callback){
   	var sequenceDocument = cardIdCounter.findOneAndUpdate({
   		_id : sequenceName
   	},{$inc : { sequence_value : 1 } },function(err,doc){
   		if (doc){
   			callback && callback(doc.sequence_value);
   		}
   	})
}


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login');
});



/*
 * 登录
 */
router.get('/api/v1/signin',function(req,res,next){
	console.log(req.query,typeof req.query);
	if (!util.isEmptyObject(req.query)){
		res.send(JSON.stringify({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		}))
	} else {
		let data = req.query;
		user.findOne({username : data.username},function(err,doc){
			if (err){
				res.send('链接异常')
			}
			if (doc.password == data.password){
				res.send(JSON.stringify({
					status : 1,
					data: {
						username : doc.username,
						age : doc.age,
						location : doc.location
					},
					errorcode : 0,
					errormsg : '登录成功'
				}))
			} else {
				return errHandle(res,{
					errorName : 'loginPswErr'
				})
			}
		})
		
	}
})

/*
 * 注册
 */
router.get('/api/v1/signup',function(req,res,next){
	let data = req.query;
	if (!data.username || !data.password || !data.age || !data.location || !data.tel){
		res.send({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		})
		return;
	}
	getNextSequenceValue('userid',(data1) => {
		user.findOne({username : data.username},function(err,doc){
//			console.log(err,doc);
			if (err){
				res.send('链接异常')
			}
			if (doc){
				res.send({
					status : 0,
					data: {},
					errorcode : 0,
					errormsg : '用户名已被注册'
				})
			} else {
				// 保存到数据库
				data['userid'] = data1;
				console.log(data);
	            user.create(data, function (err, doc) {
	               	res.send({
						status : 1,
						data: {
							id : data1,
							username : doc.username,
							age : doc.age,
							location : doc.location,
							tel : doc.tel
						},
						errorcode : 0,
						errormsg : ''
					})
	            })
			}
		})
	})
})

/*
 * 请求卡信息
 * 卡片statsu : 1 未使用，2 赠送
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
			let cards = obj.cards;
			if (cards.length >= 50){
				return errHandle(res,{
					errorName : 'creatCardLimit'
				})
			}
			getNextSequenceValue('cardsid',function(num){
				data.card.id = num;
				data.card.useStatus = 0;
				data.card.cardStatus = 0;
				cards.push(data.card);
				user.updateOne({
					username : data.username
				},{cards : cards},function(err,res1){
					if (res1 && res1.ok == 1){
						return res.send({
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
			});
		} else {
			return errHandle(res,{
				errorName : 'userNotfind'
			})
		}
	})
})

/*
 * 赠送卡片
 */
router.get('/giveCard',function(req,res,next){
	let data = req.query;
	if (!data.username || !data.cardid || !data.receiver){
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
			let cards = obj.cards,cardObj = null;
			for (var i = 0; i < cards.length; i++){
				if (cards[i].id == data.cardid){
					cardObj = cards[i];
					break;
				}
			}
			if (cardObj.cardStatus == 1){
				return errHandle(res,{
					errorName : 'cardGived'
				})
			}
			cardObj.cardStatus = 1;
			user.updateOne({
				username : data.username
			},{cards : cards},function(err,res1){
				if (res1 && res1.ok == 1){
					user.findOne({
						username : data.receiver
					},(err,obj1) => {
						if (obj){
							let _arr = obj1.cards;
							cardObj.giver = data.username;
							cardObj.giveTime = new Date().format('yyyy-MM-dd');
							_arr.push(cardObj);
							user.updateOne({
								username : data.receiver
							},{cards : _arr},(err,res2) => {
								if (res1&& res1.ok == 1){
									res.send({
										status : 1,
										data: {},
										errorcode : 0,
										errormsg : ''
									})
								}
							})
						}
					})
				} else {
					return errHandle(res,{
						errorName : 'deleteCardErr'
					})
				}
			})
		} else {
			
		}
	})
})

module.exports = router;