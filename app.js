var express = require('express');

var app = express();

// 加载模板插件
var handlebars = require('express3-handlebars')
					.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

// 设置端口
app.set('port',process.env.PORT || 3000);

// 添加静态资源
app.use(express.static(__dirname + '/public'))
// static 中间件相当于给你想要发送的所有静态文件创建了一个路由，渲染文件并发送给客户端。接下来我们在 public 下面创建一个子目录 img，并把 logo.png 文件放在其中

// 路由编写
app.get('/',function(req,res){
	// res.type('text/plain');
	// res.send('home');
	res.render('home');
});

app.get('/about',function(req,res){
	
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
	res.render('about',{fortune:randomFortune});
});

// 404 catch-all 处理器（中间件）
app.use(function(req,res,next){
	// res.type('text/plain');
	// res.send('404 - Not Found');
	res.status(404);
	res.render('404');
});

// 500 错误处理器（中间件）
app.use(function(err,req,res,next){
	console.log(err.stack);
	// res.type('text/plain');
	// res.send('500 - Server Error');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express http://localhost:'+ app.get('port'));
})

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];