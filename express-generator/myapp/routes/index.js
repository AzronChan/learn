let express = require('express'),
	router = express.Router(),
	User = require('../models/user'),
	os = require("os")

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('demi');
});

router.get('/demi', function(req, res, next) {
	res.send('demi');
})

router.get('/lsj', function(req, res, next) {
	res.send('lsj');
})

router.get('/czl', function(req, res, next) {
	res.send('czl');
})

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/register', function(req, res) {
	res.render('reg');
});

router.get('/os',function(req,res){
	var h = ['返回操作系统的默认临时文件夹:' + os.tmpdir(),
	'返回操作系统的默认临时文件夹:' + os.endianness(),
	'返回操作系统的主机名:' + os.hostname(),
	'返回操作系统的默认临时文件夹:' + os.type(),
	'返回操作系统名:' + os.platform(),
	'返回操作系统的默认临时文件夹:' + os.arch(),
	'返回操作系统的默认临时文件夹:' + os.release(),
	'返回操作系统的默认临时文件夹:' + os.uptime(),
	'返回操作系统的默认临时文件夹:' + os.loadavg(),
	'返回操作系统的默认临时文件夹:' + os.totalmem(),
	'返回操作系统的默认临时文件夹:' + os.freemem(),
	'返回操作系统的默认临时文件夹:' + os.cpus()
	].join('<br/>')
	var arr = os.networkInterfaces(),networkInterfacesH = '';
	for (var i = 0;i < arr.length; i++){
		networkInterfacesH += JSON.stringify(arr[i]); 
	}
	h += '返回操作系统的默认临时文件夹:' + os.networkInterfacesH;
	res.send(h);
})

// 这里的业务逻辑将写在 两个post 路由里 
router.post('/login', function(req, res) {
	var postData = {
		username: req.body.username,
		password: req.body.password
	};
	User.findOne({
		username: postData.username,
		password: postData.password
	}, function(err, data) {
		if(err) throw err;
		if(data) {
			res.send('登录成功');
		} else {
			res.send('账号或密码错误')
		}
	})
});
router.post('/register', function(req, res) {
		// 获取用户提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address
    };
    // 查询是否被注册
    User.findOne({username: postData.username}, function (err, data) {
        if (data) {
            res.send('用户名已被注册');
        } else {
            // 保存到数据库
            User.create(postData, function (err, data) {
                if (err) throw err;
                console.log('注册成功');
                res.redirect('/userList');      // 重定向到所用用户列表
            })
        }
    });
});


// 获取所有用户列表
router.get('/userList', function (req, res) {
    var userList = User.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});

module.exports = router;