var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    userid : Number,
    password: {
        type: String
    },
    age: Number,
    location : String,
    tel : Number,
    cards : Array,
    createAt: {
        type: Date,
        default : Date.now()
    }
});
// 将数据模型暴露出去
module.exports = mongoose.model('users', userSchema);