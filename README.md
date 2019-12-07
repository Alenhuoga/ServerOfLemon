# 使用说明

nodejs+mongoDB+mongoose实现评论发布Demo，登录注册评论发布及评论列表

1.执行npm install

2.安装mongoDB，并启动mongo（保证服务开启）

3.在database目录里更改数据库配置，连接自己的数据库（db.js文件,其他的文件是配置schema）

4.在根目录执行node app.js启动服务

5.在浏览器打开http://localhost:8000即可查看项目






###前言：使用nodejs实现登录、注册、商品发布、商品列表展示Demo，通过这个demo熟悉nodejs使用，mongoDB的一些简单操作。
##一、环境准备

###1.nodejs安装

到官网下载安装包，或者在nvm上下载，我本地的node版本为v6.9.2

###2.mongoDB安装

a.第一种方法是直接下载压缩包解压

   第二种方法使用在终端brew install mongodb

b.启动mongoDB：

进入到安装mongo的目录下的mongo/bin路径下

执行mongod


mongo启动成功
看到这个界面即mongo启动成功。

c.可以下载mongoDB图形管理工具，查看和管理数据库，我用的是NoSQLBooster for MongoDB。

##二、开始写代码啦

环境准备好后，可以开始写nodejs逻辑以及页面了，你需要有的基础是：

###1.html+css+javascript前端基础

###2.npm简单操作


###3.项目目录结构

	├── productNode       项目根目录
	
	│   ├── database       启动监听数据库操作目录
	
	│   ├── public            静态资源文件放置目录
	
	│   ├── node_modules     npm安装包存放目录
	
	│  ├── routes            路由及接口目录
	
	│   ├── app.js              项目初始化及启动服务文件
	
	│  ├── package.json    package.json文件

###5. app.js 项目初始化及启动服务文件

	var express=require('express');
	
	var app=express();
	
	var hbs=require('hbs');
	
	var bodyParser=require('body-parser');
	
	var cookieParser=require('cookie-parser');
	
	var router=require('./routes/route');
	
	require('./database/db');
	
	app.set('view engine','html');
	
	app.engine('.html',hbs.__express);//指定模板为html

	/*中间件*/
	
	app.use(bodyParser({uploadDir:'./public/upload'}));//body消息体解析
	
	app.use(cookieParser());
	
	app.use(multipart());
	
	app.use(express.static('./public'))//静态资源
	
	app.use(router);//路由
	
	app.listen(8080);

a.我这里用到的是express框架，使用了hbs模板引擎，指定模板文件为html格式的，是我们比较熟悉的格式，使用jade也可以。

	app.set('view engine','html');
	
	app.engine('.html',hbs.__express);

这两句设置使用的模板引擎。

b.

	var bodyParser=require('body-parser');
	
	app.use(bodyParser({uploadDir:'./public/upload'}));//body消息体解析

使用中间件的方式，引用你需要的模块，可在npm中安装即可，例如npm install body-parser。引用这个就能在接口请求中获取客户端发送过来的body消息体，还指定了文件上传路径为./public/upload。cookie-parser设置管理cookie的中间件，multipart文件上传的中间件，设置这个可以获取到客户端上传过来的file信息。

c.app.listen(8000)启动服务，为8000端口

###6.连接数据库 /database/db.js

	var mongoose=require('mongoose');
	
	var url='mongodb://localhost:27017/music_2'; //这里配置数据库信息
	
	var db=mongoose.connect(url);
	
	db.connection.on('open',function() {
	
	console.log('数据库连接成功');
	
	});
	
	db.connection.on('error',function() {
	
	console.log('数据库连接失败');
	
	})

安装mongoose是nodejs中操作mongoDB数据库的框架，mongoose.connect('mongodb://localhost:27017//music_2')连接数据库，默认的端口号为27017，数据库名称为product，并监听open事件，和error事件，连接成功或连接失败都会进到相应的时间回调中。

/database/produc.js指定集合product的数据结构，创建模型

	var mongoose = require('mongoose');

	var Schema = mongoose.Schema;

	var comentSchema = new Schema({
    	name : String,
    	description : String,
    	createTime : Number,
    	user : String,
		});

	var Coment = mongoose.model('Coment',comentSchema);

	module.exports = Coment;