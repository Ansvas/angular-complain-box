var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jsondata = require('./data.json');
var _und = require('underscore');
const mysql = require('mysql');
const morgan = require('morgan');

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

var port = process.env.PORT || 8080;

var router = express.Router();

const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'angulardb'
	})

router.post('/auth',function(req,res)
{
	console.log(req.body);
	if(req.body.user_type=='user')
	var query= 'SELECT * FROM users where email = "'+req.body.email+'" and password = "'+req.body.password+'"';
	if(req.body.user_type=='admin')
	var query= 'SELECT * FROM admin where email = "'+req.body.email+'" and password = "'+req.body.password+'"';

	console.log(query);
	connection.query(query,(err,rows,fields) => {
		console.log('we fetched users successfully');
		if(rows.length>0)
		{
			res.json(rows);
		}
		else
		{
			res.json('null');
		}
	})
})


router.post('/register',function(req,res)
{
	console.log(req.body);
	if(req.body.email && req.body.password)
	var query= 'INSERT INTO users (email,password) VALUES ("'+req.body.email+'","'+req.body.password+'")';
	else
		res.json('error: parameters are not correct');
	console.log(query);
	connection.query(query,(err,rows,fields) => {
		if(err)
			res.json('err:'+err);
		if(rows)
		{
			res.json('success');
		}
		if(fields)
		{
			res.json('fields:'+fields);
		}
	})
})


router.post('/comment',function(req,res)
{
	console.log(req.body);
	if(req.body.comp_id && req.body.user_id && req.body.comment)
	var query= 'INSERT INTO comments (comp_id,user_id,comment) VALUES ('+req.body.comp_id+','+req.body.user_id+',"'+req.body.comment+'")';
	else
	res.json('error: params are not correct');
	console.log(query);
	connection.query(query,(err,rows,fields) => {
		if(err)
			res.json('err:'+err);
		if(rows)
		{
			res.json('success');
		}
		if(fields)
		{
			res.json('fields:'+fields);
		}
	})
})

router.post('/getcomment',function(req,res)
{
	var count=0;
	/*build query*/
	var query= 'SELECT * FROM comments';
	if(req.body.user_id || req.body.comm_id || req.body.comp_id)
	{
		console.log('in main if');
		query = query+' where ';
		if(req.body.user_id)
		{
			console.log('in user id');
			query = query+' user_id = '+req.body.user_id;
			count++;
		}

		if(req.body.comm_id)
		{
			console.log('in comment');
			if(count>0)
				query = query+' and comm_id = '+req.body.comm_id;
			else
				query =query+' comm_id = '+req.body.comm_id;
			count++;
		}

		if(req.body.comp_id)
		{
			console.log('in complain');
			if(count>0)
				query = query+' and comp_id = '+req.body.comp_id;
			else
				query = query+' comp_id = '+req.body.comp_id;
		}
	}
	console.log(query);
	connection.query(query,(err,rows,fields) => {
		if(err)
			res.json('err:'+err);
		if(rows)
			res.json(rows);		
		/*if(fields)		
			res.json('fields:'+fields);*/
		
	})
})

router.post('/complain',function(req,res)
{
	console.log(req.body);
	var date = new Date();
	var Dtime = date.getTime();
	console.log(Dtime);
	var status = 9;
	if(req.body.user_id && req.body.title && req.body.body);
	var query= 'INSERT INTO complaints (user_id,title,body,status,date) VALUES ('+req.body.user_id+',"'+req.body.title+'","'+req.body.body+'",'+status+',now())';
	console.log(query);
	connection.query(query,(err,rows,fields) => {
		if(err)
			res.json('err:'+err);
		if(rows)
		{
			res.json('success');
		}
		if(fields)
		{
			res.json('fields:'+fields);
		}
	})
})

router.post('/getcomplain',function(req,res)
{
	var count=0;

	/*build query*/
	var query= 'SELECT * FROM complaints';
	if(req.body.user_id || req.body.comp_id)
	{
		query = query+' where ';
		if(req.body.user_id)
		{
			console.log('in user id');
			query = query+' user_id = '+req.body.user_id;
			count++;
		}

		if(req.body.comp_id)
		{
			console.log('in comment');
			if(count>0)
				query = query+' and comp_id = '+req.body.comp_id;
			else
				query =query+' comp_id = '+req.body.comp_id;
			count++;
		}
	}
	console.log(query);
	connection.query(query,(err,rows,fields) => {
		if(err)
			console.log('err:'+err);
		if(rows)
			res.json(rows);
		
		if(fields)		
			console.log('fields:'+fields);
		
	})
})

app.use('/api',router);
app.listen(port);