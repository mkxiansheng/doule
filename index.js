
var express = require('express');
var app = express();

var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/doule');

app.get('/api/pic', function(req,res){
	var dbs = db;
	var collection = dbs.get('pic');
	collection.find({},{},function(e,docs){
		if (e) {
			console.log(e);
			var err = {
				err: true
			}
            res.end(JSON.stringify(err))
		}else{
     		res.end(JSON.stringify(docs))
		}
	});
});

app.get('/api/joke', function(req,res){
	var dbs = db;
	var collection = dbs.get('joke');
	collection.find({},{},function(e,docs){
		if (e) {
			console.log(e);
			var err = {
				err: true
			}
            res.end(JSON.stringify(err))
		}else{
     		res.end(JSON.stringify(docs))
		}
	});
});

app.get('/api/collection', function(req,res){
	var dbs = db;
	var collection = dbs.get('collection');
	collection.find({},{},function(e,docs){
		if (e) {
			console.log(e);
			var err = {
				err: true
			}
            res.end(JSON.stringify(err))
		}else{
     		res.end(JSON.stringify(docs))
		}
	});
});


app.listen(4466)