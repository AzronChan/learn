/*
 * MongoDB 自动增长
 * card id 自增长
 */
let mongoose = require('mongoose');
	Schema = mongoose.Schema;

let counterSchema = new Schema({
    _id : {
    	type : String
    },
    sequence_value : Number,
});

let modelCounter = mongoose.model('counter', counterSchema);

(function(){
	modelCounter.findOne({_id : 'cardsid'},function(err,doc){
		if (!doc){
			modelCounter.create({
				_id : 'cardsid',
				sequence_value : 0
			},function(err, doc){
				if (doc){
					console.log('卡片ID计算器生成成功');
				}
			})
		} else {
			console.log('卡片ID计算器已存在');
		}
	})
})();

(function(){
	modelCounter.findOne({_id : 'userid'},function(err,doc){
		if (!doc){
			modelCounter.create({
				_id : 'userid',
				sequence_value : 0
			},function(err, doc){
				if (doc){
					console.log('用户ID计算器生成成功');
				}
			})
		} else {
			console.log('用户ID计算器已存在');
		}
	})
})()

// 将数据模型暴露出去
module.exports = mongoose.model('counter', counterSchema);