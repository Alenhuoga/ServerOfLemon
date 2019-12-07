var express = require('express');

var router = express.Router();

var user = require('../database/user');

var product = require('../database/coments');

var picModel = require('../database/banner')

var songModel = require('../database/song')

router.get('/',function(req,res) {
    res.render('index',{
        title : '首页'
    })
});

router.get('/login',function(req,res) {

    var account = req.cookies["account"];
    if(account) {
        res.redirect('/');
    }else{
        res.render('login',{
            title : '登录'
        })
    }
    
});

router.get('/register',function(req,res) {
    res.render('register',{
        title : '注册'
    })
});


router.get('/push',function(req,res) {

    var account = req.cookies["account"];


    if(!account || account == "") {
        res.redirect('/login');
    }else{
        res.render('push',{
            title : '发布评论'
        })
    }
    
});

/*
   api接口
*/




//登录
router.post('/api/login',function(req,res) {

    var name = req.body.name1;

    var password = req.body.password;

    var query = {
        name : name,
        password : password
    }


    user.find(query,function(err,docs) {
            if(err) {
                console.log('find user error');
            }else{
                if(docs.length == 0) {
                    res.send({
                        status : 500,
                        message : '用户名或密码错误'
                    });
                }else{
                    res.cookie("account", {name: name, password:password}, {maxAge: 200000});
                    req.session.user = query;
                    console.log(req.session.user.name)
                    res.send({
                        status : 200,
                        message : 'login success'
                    });
                }
            }
        });

});

//注册
router.post('/api/register',function(req,res) {

    var name = req.body.name;

    var password = req.body.password;

    var query = {
        name : name,
        password : password
    }


        user.find({
            name : name
        },function(err,docs) {
            if(err) {
                console.log('find user error');
            }else{
                if(docs.length == 0) {
               

     //注册用户
    var userOne = new user(query);

    userOne.save(function(err,data) {
        if(err) {
            console.log(err);
        }else{
            console.log("用户创建成功");
            console.log(data);
            req.session.user = query;
            res.cookie("account", {name:name,password:password}, {maxAge: 2000000});
            res.send({
                status : 200,
                message : 'register success'
            });
        }
    });
                }else{
                    res.send({
                        status : 500,
                        message : '用户已存在'
                    });
                }
            }
        });

});

//退出登录
router.get('/api/logout', function(req, res){
  res.clearCookie("account");
  req.session.user = null;
  res.send({
      status : 200,
      message : '退出登录成功'
  });
});
//评论发布
router.post('/api/push',function(req,res) {

    var name = req.body.name;

    var description = req.body.description;


    var createTime = req.body.createTime;



    var account = req.cookies["account"];
   
    if(!account || account == "") {
        res.send({
            status : 201,
            message : '还未登录，请先登录'
        });
    }

    var user = account['account'];
    var username = req.session.user.name;
    var username1 =username;
    console.log(username);

    var query = {
        'name' : name,
        'description' : description,
        'createTime' : createTime,
        'user' : username1,
    }
    console.log(query);


    var productOne = new product(query);

    productOne.save(function(err,data) {
        if(err) {
            console.log(err);
        }else{
            console.log(data);
            res.send({
                status : 200,
                message : 'push success'
            });
        }
    });

    

});

//获取评论列表
router.get('/api/comentstList',function(req,res) {
    
    product.find({},function(err,docs) {
        if(err) {
            console.log(err);
            res.send({
                status : 500,
                message : '获取评论列表失败',
                data : []
            });
        }else{
            res.send({
                status : 200,
                data : docs,
                message : '获取评论列表成功'
            })
        }

    })

});
















/**/
//渲染数据库所有音乐 √
router.get('/songs', function(req, res) {
	songModel.find(function(err, songs) {
		if(err) console.log('数据库查找失败');
		res.json(songs)
	});
})

//轮播图√
router.get("/banner",function(req,res){
	picModel.find(function(err,data) {
		if(err) console.log('数据库查找失败');
		res.json(data)
	})
})


//添加歌曲√
router.post('/admin/add', function(req, res,next) {
	var song = new songModel({
		name:req.body.name,
		singer:req.body.singer,
		url:req.body.url,
		picurl:req.body.picurl
	})
   

   song.save(function(err,data) {
       if(err) console.log(err);
       
           res.json(data)
           console.log(data)
   });	
	
	// var body = req.body
	// console.log(body)
	// new songModel(body).save(function(err,song){
	// 	if(err){
	// 		console.log(err);
	// 	}

	// 	res.json(body)
	// })
})

//播放歌曲√
router.post('/admin/song/output',function(req,res){
	console.log(req.body.id);
	var body = req.body
	songModel.findById(body.id,function(err,song){
		if(err) console.log(err);
		res.json(song)
	})
})


//搜索歌曲√
router.post('/admin/song/serch',function(req,res){
	var body = req.body
	//查询数据库中歌手名与歌名与输入内容相同的对象
	songModel.findOne({
		$or:[{
				name:body.cot
			},
			{
				singer:body.cot
			}
		]
	},function(err,data){
		if (err) {
			return res.status(500).json({
				err_code: 500,
				message:'服务端错误'
			})	
		}
		if (!data) {
			return res.status(201).json({
				err_code:200,
				message:'未查找到内容'
			})	
		}
		//返回查找到的数据给前端
		res.json(data)
	})
})


module.exports = router;
