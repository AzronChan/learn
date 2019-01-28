const express = require('express');
const router = express.Router();
const util = require('../models/util');
const user = require('../models/user');
const cardIdCounter = require('../models/cardIdCounter');
const errorBase = require('../models/error-base');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config');

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
 * 检查图片目录 
 * @param {String} dirname
 */
function checkMadeDir(dirname) {
	if (!dirname) return;
	let _dirname = path.dirname(dirname);
	if(fs.existsSync(_dirname)) {
		return true;
	} else {
		if(checkMadeDir(_dirname)) {
			fs.mkdirSync(_dirname);
			return true;
		}
	}
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
 * @description 用户，卡片ID生成器
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

/*
 * token验证中间件
 */
function confirmToken(){
	return function(req,res,next){
		if (!util.isEmptyObject(req.query)){
			res.send(JSON.stringify({
				status : 0,
				data: {},
				errorcode : 0,
				errormsg : '参数错误'
			}))
		} else if(!req.query.token){
			console.log(2222)
			return errHandle(res,{
				errorName : 'tokenMisErr'
			})
		} else {
			jwt.verify(req.query.token, config.jwtsecret, function (err, decoded) {
		    	if (!err){
		          	next();
		     	} else {
		     		if (err){
		     			console.log(11111)
		     			if (err.name == 'TokenExpiredError'){
		     				return errHandle(res,{
								errorName : 'TokenExpiredError'
							})
		     			} else {
		     				return errHandle(res,{
								errorName : 'JsonWebTokenError'
							})
		     			}
		     		}
		     	}
			})
		}
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login');
});


/*
 * 更新头像
 */
router.post('/api/v1/upload',(req,res,next) => {
	if (!req.body.imgdata || !req.body.userid){
		res.send(JSON.stringify({
			status : 0,
			data: {},
			errorcode : 0,
			errormsg : '参数错误'
		}))
	}
	let imgData = req.body.imgdata;
    //过滤data:URL
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, ""),
    	time = new Date().format('yyyy-MM-dd-hh-mm-ss-S').split('-').join(''),
    	imgPath = path.join(__dirname,'../public/upload/' + time+'.png'),
    	dataBuffer = new Buffer(base64Data, 'base64');
   	
   	checkMadeDir(imgPath);
	 fs.writeFile(imgPath, dataBuffer, function(err) {
        if(err){
           	return;
        } else {
        	console.log(req.body.userid,imgPath)
        	//TODO
        	let imgUrl = 'http://192.168.31.129:3000/upload/' + time + '.png'
        	user.updateOne({
				userid : req.body.userid
			},{userpic : imgUrl},function(err,res1){
				if (res1 && res1.ok == 1){
					return res.send({
						status : 1,
						data: {
							userpic: imgUrl
						},
						errorcode : 0,
						errormsg : ''
					})
				} else {
					console.log(err,res1)
					return errHandle(res,{
						errorName : 'creatCardErr'
					})
				}
			})
        }
    })

})

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
				return res.send('链接异常');
			}
			if (doc){
				if (doc.password == data.password){
					let token = jwt.sign({
					    name: 'czl'
					}, config.jwtsecret, {
					    expiresIn:  '30 days' //秒到期时间
					});
					res.send(JSON.stringify({
						status : 1,
						data: {
							username : doc.username,
							age : doc.age,
							location : doc.location,
							userid : doc.userid,
							sex : doc.sex,
							userpic : doc.userpic || '',
							token : token
						},
						errorcode : 0,
						errormsg : '登录成功'
					}))
				} else {
					return errHandle(res,{
						errorName : 'loginPswErr'
					})
				}
			} else {
				return errHandle(res,{
					errorName : 'userNotfind'
				})	
			}
		})
		
	}
})


/*
 * 获取用户信息
 */
router.get('/api/v1/get_user_info',confirmToken(),function(req,res,next){
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
		console.log(data.userid)
		user.findOne({userid : data.userid},function(err,doc){
			if (err){
				return res.send('链接异常');
			}
			if (doc){
				let token = jwt.sign({
				    name: 'czl'
				}, config.jwtsecret, {
				    expiresIn:  '30 days' //秒到期时间
				});
				res.send(JSON.stringify({
					status : 1,
					data: {
						username : doc.username,
						age : doc.age,
						location : doc.location,
						userid : doc.userid,
						sex : doc.sex,
						userpic : doc.userpic || '',
						token : token
					},
					errorcode : 0,
					errormsg : '登录成功'
				}))
			} else {
				return errHandle(res,{
					errorName : 'userNotfind'
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
	if (!data.username || !data.password || !data.mail || !data.tel){
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
							tel : doc.tel,
							confirmMail : 0,
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
router.get('/api/v1/getMyCard',function(req,res,next){
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
 * id 卡片名字
 * useStatus 卡片使用状态  1 ：使用
 * cardStatus 卡片状态 1 ： 赠送
 * giveTime //赠送时间
 * startTime 起始有效期
 * endTime 结束有效期
 * receiver 卡片被赠送者
 */
router.get('/api/v1/creatMyCard', confirmToken(),function(req,res,next){
	let data = req.query;
	if (!data.username || !data.userid){
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
				data.id = num;
				data.useStatus = 0;
				data.cardStatus = 0;
				data.receiver = '';
				data.giveTime = '';
				data.giver = data.username;
				data.giverID = data.userid;
				cards.push(data);
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
 * 卡片处理
 * type 操作类型  use ： 使用 | delete ：删除 | give ： 赠送
 * id 卡片名字
 * useStatus 卡片使用状态  1 ：使用
 * cardStatus 卡片状态 1 ： 赠送
 * giveTime //赠送时间
 * startTime 起始有效期
 * endTime 结束有效期
 * receiver 卡片被赠送者
 */
router.get('/api/v1/handle',confirmToken(),function(req,res,next){
	let data = req.query;
	if (!data.username || !data.cardid || !data.type){
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
			let cards = obj.cards,cardObj = null,index = 0;
			for (var i = 0; i < cards.length; i++){
				console.log(cards[i].id , data.cardid)
				if (cards[i].id == data.cardid){
					cardObj = cards[i];
					index = i;
					break;
				}
			}
			if (data.type == 'delete'){
				cards.splice(i,1);
				user.updateOne({
					username : data.username
				},{cards : cards},(err,res1) =>{
					if (res1 && res1.ok == 1){
						res.send({
							status : 1,
							data: {},
							errorcode : 0,
							errormsg : ''
						})
					}
				})
			} else if (data.type == 'give'){
				if (!data.receiver){
					res.send({
						status : 0,
						data: {},
						errorcode : 0,
						errormsg : '参数错误'
					})
					return;
				}
				
				user.findOne({
					username : data.receiver
				},(err,obj1) => {
					if (obj1){
						let _arr = obj1.cards;
						console.log(cardObj);
						cardObj.receiver = data.receiver;
						cardObj.giveTime = new Date().format('yyyy-MM-dd');
						_arr.push(cardObj);
						user.updateOne({
							username : data.receiver
						},{cards : _arr},(err,res2) => {
							if (res2 && res2.ok == 1){
								cards.splice(i,1);
								user.updateOne({
									username : data.username
								},{cards : cards},(err,res1) =>{
									if (res1 && res1.ok == 1){
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
							errorName : 'userNotfind'
						})
					}
				})
			} else if (data.type == 'use'){
				cards[index].useStatus = 1;
				user.updateOne({
					username : data.username
				},{cards : cards},(err1,res1) => {
					if (res1 && res1.ok == 1){
						res.send({
							status : 1,
							data: {},
							errorcode : 0,
							errormsg : ''
						})
					}
				})
			}
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