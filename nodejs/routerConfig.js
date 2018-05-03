var config = {
	login : function(res){
		res.write('登录');
	},
	signUp : function(res){
		res.write('注册');
	}
}

module.exports = config