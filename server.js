var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var myUser = new Array();
var i = 0;
var PORT = process.env.PORT || 9999;

app.set("views","./views");
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, './public/')));
app.use(bodyParser.urlencoded({extended : false}));
//if (app.get('env') == 'development') {
	var browserSync = require("browser-sync");
	var config = {
	    files: ["public/**/*.{js,css}", "client/*.js", "sass/**/*.scss", "views/**/*.ejs"],
	    logLevel: 'debug',
	    reloadDelay: 0,
	    reloadOnRestart: true
};
var bs = browserSync(config);
app.use(require('connect-browser-sync')(bs));
//}
//app.use(require('connect-browser-sync')(bs));
//app.use(express.static(__dirname + '/public'));
//app.use('/css', express.static('public/stylesheet'))
//app.use('/fonts', express.static('public/fonts'))
//app.use('/img', express.static('public/image'))
//app.use('/js', express.static('public/javascript'))

app.get('/', function(req,res) {
	//res.sendfile("login.html");
	  res.render('login', {
    title: 'Welcome'
  });
	});
app.get('/signup', function(req,res) {
	//res.sendfile("signup.html");
	  res.render('signup', {
    title: 'Sign Up'
  });
});

app.get('/login', function(req,res) {
	//res.sendfile("login.html");
	  res.render('login', {
    title: 'Login'
  });
});

app.post('/login', function(req,res){
	var username1 = req.body.user;
	var password1 = req.body.password;
	var flag = 0;
	for (var k = 0; k < myUser.length; k++)
	{
		if (myUser[k].user === username1 && myUser[k].pass === password1)
		{
			console.log("Sign in successfully with id " + username1 + " " + password1 );
			//res.send(" <p>Welcome </p>" + username1);
			flag = 1;
			res.end("yes");
		}	
	}
	if (flag === 0)
	{
		console.log("Sign in failed");
		//res.send("<h1>Nhập sai tên tài khoản và mật khẩu</h1>");
		res.end("no");
	}
		
});

app.post('/signup', function(req,res){
	var username = req.body.user;
	var password = req.body.password;
	var account = {user : username, pass : password};
	var flag = 0;
	for(var k = 0; k < myUser.length; k++)
	{
		if (myUser[k].user === username)
			flag = 1;
	}
	if (flag === 0)
	{
		myUser[i] = account;
		console.log("Client POST data username " + username + " password " + password)
		res.end("yes");
		i++;
	}
	else {
		console.log("username already have in database")
		res.end("already");
	}	
})

app.listen(PORT, function(req,res) {
	console.log("Server started on port 9999");
});
