/*
 * 错误码定义
 * 错误信息定义
 */

module.exports = {
	userNotfind : {
		errorCode : 1,
		errorMsg : '用户不存在'
	},
	creatCardErr : {
		errorCode : 201,
		errorMsg : '创建失败'
	},
	creatCardLimit : {
		errorCode : 202,
		errorMsg : '卡片数量超出限制'
	}
}
