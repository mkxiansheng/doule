//index.js
//获取应用实例
const app = getApp()

const API_URL_JOKE = 'http://localhost:4466/api/updata/joke'
const API_URL_PIC = 'http://localhost:4466/api/updata/pic'
const API_URL_IMG = 'http://localhost:4466/upload'

Page({

  data: {
  	newJoke: '',
    ispic: false,
    pic: ''
  },

  addNew: function(){
  	var that = this
  	console.log('in click')

    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var hashId = ''
    for(var i=0,len=32;i<len;i++){
        var key = Math.ceil(Math.random()*35)
        hashId += chars[key]
    }

    var time = new Date()
    var updatetime = time.toLocaleString()
    var newInfo;

    var t = '';
    t = setTimeout(function(){

      if (that.data.pic) {
        newInfo = {
          "content": that.data.newJoke,
          "hashId": hashId,
          "updatetime": updatetime,
          "url": that.data.pic    
        }   
        wx.request({
          url: API_URL_PIC,
          data: newInfo,
          header: { 'Content-Type': 'application/json' },
          success (res) {
            // callback(null, res.data)
            console.log(res.data)
          },
          fail (e) {
            callback(e)
          }
        })       
      }else{
        newInfo = {
          "content": that.data.newJoke,
          "hashId": hashId,
          "updatetime": updatetime
        }      
        wx.request({
          url: API_URL_JOKE,
          data: newInfo,
          header: { 'Content-Type': 'application/json' },
          success (res) {
            // callback(null, res.data)
            console.log(res.data)
          },
          fail (e) {
            callback(e)
          }
        })
      }
      
    }, 300)


  },

  textContent: function(e){

  	var that = this

    var content = e.detail.value

    that.setData({
    	newJoke: content
    })

  },

  addPic: function(e){
    var that = this;
    console.log(that);
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: API_URL_IMG, 
          header: {
            'content-type': 'multipart/form-data'
          },
          filePath: tempFilePaths[0],
          name: 'logo',
          success: function(res){
            var data = res.data
            // var datas = JSON.parse(data);
            // console.log(datas.imgUrl);
            var picUrl = 'http://localhost:4466/'+data
            that.setData({
              ispic: true,
              pic : picUrl
            })
            console.log(that.data.pic);
          }
        })
      }
    })    
  },

  onLoad: function () {


  }
})
