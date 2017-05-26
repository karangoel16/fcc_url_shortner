var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var path = require('path');
var Post = require('./models/post');
var api = require('./api/api');
var valid=require('valid-url');
var app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/view'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.route(/\/add\/.+/)
	.get(function(req,res,next){
		var path=req.path.replace('/add/','');
		console.log(path);
		var loc=null;
		var obj=null;
		if(valid.isUri(path))
		{
			Post.count(function(err,val)
			{
				if(err)
				{
					return -1;
				}
				var post=new Post({
					add:path,
					link:'l/'+api(val)
				});
				post.save(function(err,result){
					if(err)
					{
						console.log(err);
						return err;
					}
					loc=process.env.APP_URL+post.link;
					obj={"original_url":path,"short_url":loc};
					res.send(obj);
				});
			});
		}
		else
		{
			obj={"original_url":path,"short_url":loc}
			res.send(obj);
		}
		});
app.route('add')
	.post(function(req,res,next){
		Post.count(function(err,val)
		{
			if(err)
			{
				console.log(err);
				return -1;
			}
			var post=new Post({
				add:req.params.id||req.body.link,
				link:'l/'+api(val)
			});
			post.save(function(err,result){
				if(err)
				{
					console.log(err);
					return err;
				}
				if(id)
				{
					res.send("Hello");
				}
				res.render('sucess',{link:process.env.APP_URL+post.link});
			});
		});
	});
app.route('/')
	.get(function(req,res,next){
		res.render('index');
	});
app.route('/l/:link')
	.get(function(req,res,next){
		var link = req.params.link;
		console.log(link);
		Post.findOne({link:'l/'+link},function(err,post)
		{
			if(err)
			{
				console.log(err);
				next();
			}
			if(!post)
			{
				res.send("No link exist");
			}
			res.redirect(post.add);
		});
	});
var port=process.env.PORT || 8080;
app.listen(port,function(){
	console.log("Listening at "+port);
});