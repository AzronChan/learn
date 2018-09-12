/*
 * 错误码定义
 * 错误信息定义
 */

module.exports = {
	/*
	 * 1**** 用户相关失败
	 */
	userNotfind : {
		errorCode : 10001,
		errorMsg : '用户不存在'
	},
	loginPswErr: {
		errorCode : 10002,
		errorMsg : '密码错误'
	},
	tokenMisErr : {
		errorCode : 10003,
		errorMsg : 'token不可为空'
	},
	TokenExpiredError : {
		errorCode : 10004,
		errorMsg : 'token已过期'
	},
	JsonWebTokenError : {
		errorCode : 10004,
		errorMsg : 'token验证失败'
	},
	/*
	 * 2**** 卡片相关失败
	 */
	creatCardErr : {
		errorCode : 20001,
		errorMsg : '创建失败'
	},
	creatCardLimit : {
		errorCode : 20002,
		errorMsg : '卡片数量超出限制'
	},
	deleteCardErr : {
		errorCode : 20003,
		errorMsg : '删除卡片失败'
	},
	cardGived : {
		errorCode : 20004,
		errorMsg : '卡片已赠送'
	}
	
}
