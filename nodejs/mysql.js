let	mysql = require('mysql'),
	connection = mysql.createConnection({
	    host: 'localhost',       //主机  
	    user: 'root',               //MySQL认证用户名  
	    password: '123456',        //MySQL认证用户密码  
	    database: 'test',  
	    port: '3306'                   //端口号  
	});
	
//创建一个connection  
connection.connect(function(err){  
    if(err){         
        console.log('[query] - :'+err);  
        return;  
    }  
    console.log('[connection connect]  succeed!');  
}); 

//输入数据
let userAddSql = 'insert into user (uname,pwd) value (?,?)',
	param = ['czl','123456'];
//插入
//query相当于执行sql命令
connection.query(userAddSql,param,function(err,res){
	if (err){
		console.log(err)
		return;
	} else {
		console.log('insert success');
	}
})

//查询
connection.query('select * from user',function(err,res){
	if (err){
		console.log(err)
		return;
	} else {
		//输出为数组 [{},{}]
		console.log();
	}
})


//关闭connection  
connection.end(function(err){  
    if(err){ 
        console.log(err.toString());
        return;  
    }  
    console.log('[connection end] succeed!');  
}); 