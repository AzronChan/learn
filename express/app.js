var express = require('express');
var app = express(),
		router = require('./router')

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.all('/select',function(req,res){
	console.log('1111')
})

app.get('/index',function(req,res){
	res.sendfile('./view/index.html')
})

/*
 * app 中间件执行顺序
 */
//app 中间件执行顺序
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});

// 为路径设定多个路由；
app.get('/pwd/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// 下面这个不会被执行，因为第一个路由/pwd/:id 已经终止了请求-响应循环
app.get('/pwd/:id', function (req, res, next) {
  res.end(req.params.id);
});


//调用 next('route') 方法将控制权交给下一个路由
app.get('/name/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  res.send('User Info');
});

// 下面这个不会被执行，因为第一个路由/pwd/:id 已经终止了请求-响应循环
app.get('/name/:id', function (req, res, next) {
  res.send('second User Info');
});




/*
 * 路由句柄
 */
//理解为app.method之后操作什么
//多回调函数调用
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

//使用回调函数数组处理路由：
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

//混合使用函数和函数数组处理路由：
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});


/*
 * express.router
 */
app.use('/birds', router);

//挂载一个虚拟目录
app.use('/static',express.static('public'));


var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});