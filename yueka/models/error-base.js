/*
 * 错误码定义
 * 错误信息定义
 */

module.exports = {
	userNotfind : {
		errorCode : 10001,
		errorMsg : '用户不存在'
	},
	loginPswErr: {
		errorCode : 10002,
		errorMsg : '密码错误'
	},
	creatCardErr : {
		errorCode : 20001,
		errorMsg : '创建失败'
	},
	creatCardLimit : {
		errorCode : 20002,
		errorMsg : '卡片数量超出限制'
	},
	deleteCardErr : {
		errorCode : 30001,
		errorMsg : '删除卡片失败'
	},
	cardGived : {
		errorCode : 40001,
		errorMsg : '卡片已赠送'
	}
	
}
