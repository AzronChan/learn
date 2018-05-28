var OptPool = require('./models/mysqlConfig.js'); 
 
var optPool = new OptPool(); 
var pool = optPool.getPool(); 

//执行SQL语句 
pool.getConnection(function(err,conn){
    //----插入 
    var userAddSql = 'insert into user (uname,pwd) values(?,?)'; 
    var param = ['eee','eee111'];
    conn.query(userAddSql,param,function(err,rs){
        if(err){ 
            console.log('insert err:',err.message); 
            return; 
        } 
        console.log('insert success'); 
        //conn.release(); //放回连接池
    })
    //查询 
    conn.query('SELECT * from user', function(err, rs) { 
        if (err) { 
            console.log('[query] - :'+err); 
            return; 
        }   
        for(var i=0;i<rs.length;i++){
            console.log(rs[i].pwd); 
        }
        conn.release(); //放回连接池
    });
}); 