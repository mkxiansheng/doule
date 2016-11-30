
var express = require('express');
var app = express();

var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/doule');

var fs = require('fs');
var multer  = require('multer')

app.use('/',express.static(__dirname));

// 获取pic
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

// 获取joke
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

// 获取收藏
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

// 添加pic
app.get('/api/updata/pic', function(req,res){
  console.log(req.query)
  var newInfo = req.query;
	var dbs = db;
	var collection = dbs.get('pic');
	collection.insert(newInfo,function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

// 添加joke
app.get('/api/updata/joke', function(req,res){
	console.log(req.query)
	var newInfo = req.query;
	var dbs = db;
	var collection = dbs.get('joke');
	collection.insert(newInfo,function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

// 添加收藏
app.get('/api/updata/collection', function(req,res){
	var dbs = db;
	var collection = dbs.get('collection');
	collection.insert({
      "content": '女票一直是个女汉子，为了让我在朋友面前有面子，展现她阴柔娇弱的一面，吃夜宵摊时她说：“老公~帮人家拧开这个啤酒瓶盖嘛~”吓得我坐到地上！',
      "hashId":"607ce06b4bed0d7b0012b66ed201fb02",
      "unixtime":1418815449,
      "updatetime":"2014-12-19 10:23:59",
      "zan": 11,
      "cai": 2
    },function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

// 取消收藏
app.get('/api/del/collection', function(req,res){
	var dbs = db;
	var collection = dbs.get('collection');
	collection.remove({
      "hashId":"607ce06b4bed0d7b0012b66ed201fb02"
    },function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

//上传图片
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + (file.originalname).split(".")[1])
  }
})

var upload = multer({ storage: storage })


// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    var data = {
      imgUrl : file.path
    }
    console.log(data.imgUrl);
    res.end(JSON.stringify(data));
});

app.listen(4466)