
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
	collection.find({},{sort: {"updatetime": -1}},function(e,docs){
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
	collection.find({},{sort: {"updatetime": -1}},function(e,docs){
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
app.get('/api/getcollection', function(req,res){
  var dbs = db;
  var collection = dbs.get('pic');
  collection.find({"col_url":"true"},function(e,docs){
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

//赞
app.get('/api/zan', function(req,res){
  console.log(req.query)
  var newInfo = req.query;
  var id = newInfo.hashId;
  var iszan = newInfo.iszan;
  var zan = newInfo.zan;

  var dbs = db;
  var collection = dbs.get('pic');
  collection.update({"hashId":id},{$set:{"zan":zan,"iszan":iszan}},function(e,docs){
      if (e) {
        console.log(e)
        var err = {
          err: true
        }
        res.end(JSON.stringify(err))
      }else{
        console.log(docs)
        res.end(JSON.stringify(docs))
      }
    })
});

//踩
app.get('/api/cai', function(req,res){
  console.log(req.query)
  var newInfo = req.query;
  var id = newInfo.hashId;
  var iscai = newInfo.iscai;
  var cai = newInfo.cai;

  var dbs = db;
  var collection = dbs.get('pic');
  collection.update({"hashId":id},{$set:{"cai":cai,"iscai":iscai}},function(e,docs){
      if (e) {
        console.log(e)
        var err = {
          err: true
        }
        res.end(JSON.stringify(err))
      }else{
        console.log(docs)
        res.end(JSON.stringify(docs))
      }
    })
});
//踩
app.get('/api/collection', function(req,res){
  console.log(req.query)
  var newInfo = req.query;
  var id = newInfo.hashId;
  var col_url = newInfo.col_url;

  var dbs = db;
  var collection = dbs.get('pic');
  collection.update({"hashId":id},{$set:{"col_url":col_url}},function(e,docs){
      if (e) {
        console.log(e)
        var err = {
          err: true
        }
        res.end(JSON.stringify(err))
      }else{
        console.log(docs)
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