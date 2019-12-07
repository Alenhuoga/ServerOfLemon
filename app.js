
var express = require('express');

var app = express();

var hbs = require('hbs');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var session = require('express-session');


var router = require('./routes/route');

require('./database/db');



app.set('view engine','html');

app.engine('.html',hbs.__express);  //指定模板为html

/*
    中间件
*/
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use(bodyParser());  //body消息体解析

app.use(cookieParser());


app.use(express.static('./public'))  //静态资源

app.use(router);  //路由


var server=app.listen(8000,function()
{
    var host = server.address().address;
    var port = server.address().port;
    
  console.log('Example app listening at http://localhost:%s', port);
});


