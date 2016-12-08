//index.js
//获取应用实例
const app = getApp()

const API_URL = 'http://localhost:4466/api/pic';
const API_URL_JOKE = 'http://localhost:4466/api/joke';
const API_URL_PIC = 'http://localhost:4466/api/pic';
const API_URL_ZAN = 'http://localhost:4466/api/zan';
const API_URL_CAI = 'http://localhost:4466/api/cai';
const API_URL_COL = 'http://localhost:4466/api/collection';

Page({
  data: {
    actived: 0,
    swiperHeight: 0,
  	req: [],
    joke: [],
    pic: []
  },
  //tab
  tabHome: function(){
    this.setData({
      actived: 0
    })
  },
  tabJoke: function(){
    this.setData({
      actived: 1
    })
  },
  tabPic: function(){
    this.setData({
      actived: 2
    })
  },
  bindchange: function(e){
    var that= this
    that.setData({
      actived: e.detail.current
    })
  },  
  //下拉更新
  scrollUpData: function(e){
  	console.log('scrollUpData')
  	var that = this
    wx.showToast({
      title: '加载中,请稍后',
      icon: 'loading',
      duration: 5000
    })
    app.fetchApi (API_URL,(err,data) => {
      that.setData({
        req: data
      })
      console.log('updata');
      console.log('updata--'+data[0].content);
      wx.hideToast();
      wx.stopPullDownRefresh();
    })      
  	
  },
  //下拉更新
  scrollUpDataJoke: function(e){
    console.log('scrollUpDataJoke')
    var that = this

    app.fetchApi (API_URL_JOKE,(err,data) => {
      that.setData({
        joke: data
      })
      console.log('updata');
      console.log('updata--'+data[0].content);
    })      
    
  },  
  //TODO 上拉加载
  lower: function(e){
  	console.log('lower')
  },
  //TODO 滚动add/del列表
  scroll: function(e){
  	console.log('scroll')
  },

  collection: function(event){
  	var id = event.target.dataset.id;
  	var list = this.data.req;
  	for(var i=0,len=list.length; i<len; i++){
  		if (list[i].hashId==id) {
  			console.log(list[i].col_url)
  			if (list[i].col_url) {
  				list[i].col_url = false;
          var newInfo = {
            "hashId": id,
            "col_url": false
          }
          console.log(this.data.req)          
          wx.request({
            url: API_URL_COL,
            data: newInfo,
            header: { 'Content-Type': 'application/json' },
            success (res) {
              // callback(null, res.data)
              console.log(res.data)
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
              })         
            },
            fail (e) {
              callback(e)
            }
          })  
  			}else{
	  			list[i].col_url = true;
          var newInfo = {
            "hashId": id,
            "col_url": true
          }    
          console.log(this.data.req)                 
          wx.request({
            url: API_URL_COL,
            data: newInfo,
            header: { 'Content-Type': 'application/json' },
            success (res) {
              // callback(null, res.data)
              console.log(res.data)
              wx.showToast({
                title: '谢谢你的收藏',
                icon: 'success',
                duration: 2000
              })         
            },
            fail (e) {
              callback(e)
            }
          })            
  			}
  		}
  	}
  	this.setData({
  		req: list
  	})
  },

  zan: function(event){
  	var id = event.target.dataset.id;
  	var list = this.data.req;
  	for(var i=0,len=list.length; i<len; i++){
  		if (list[i].hashId==id) {
  			console.log(list[i].iszan)
  			if (list[i].iszan) {
  				list[i].iszan = false;
  				list[i].zan = list[i].zan-1;
          var newInfo = {
            "hashId": id,
            "iszan": false,
            "zan": list[i].zan
          }  
          console.log(this.data.req)                   
          wx.request({
            url: API_URL_ZAN,
            data: newInfo,
            header: { 'Content-Type': 'application/json' },
            success (res) {
              // callback(null, res.data)
              console.log(res.data)
              wx.showToast({
                title: '取消赞',
                icon: 'success',
                duration: 2000
              })         
            },
            fail (e) {
              callback(e)
            }
          })           
  			}else{
	  			list[i].iszan = true;
  				list[i].zan = list[i].zan+1;
          var newInfo = {
            "hashId": id,
            "iszan": true,
            "zan": list[i].zan
          }
          console.log(this.data.req)           
          wx.request({
            url: API_URL_ZAN,
            data: newInfo,
            header: { 'Content-Type': 'application/json' },
            success (res) {
              // callback(null, res.data)
              console.log(res.data)
              wx.showToast({
                title: '谢谢你的赞',
                icon: 'success',
                duration: 2000
              })         
            },
            fail (e) {
              callback(e)
            }
          })         

  			}
  		}
  	}
  	this.setData({
  		req: list
  	})
  },

  cai: function(event){
  	var id = event.target.dataset.id;
  	var list = this.data.req;
  	for(var i=0,len=list.length; i<len; i++){
  		if (list[i].hashId==id) {
  			console.log(list[i].iscai)
  			if (list[i].iscai) {
  				list[i].iscai = false;
  				list[i].cai = list[i].cai-1;
          var newInfo = {
            "hashId": id,
            "iscai": false,
            "cai": list[i].cai
          } 
          console.log(this.data.req)                    
          wx.request({
            url: API_URL_CAI,
            data: newInfo,
            header: { 'Content-Type': 'application/json' },
            success (res) {
              // callback(null, res.data)
              console.log(res.data)
              wx.showToast({
                title: '脚下留情',
                icon: 'success',
                duration: 2000
              })         
            },
            fail (e) {
              callback(e)
            }
          })            
  			}else{
	  			list[i].iscai = true;
  				list[i].cai = list[i].cai+1;
          var newInfo = {
            "hashId": id,
            "iscai": true,
            "cai": list[i].cai
          }     
          console.log(this.data.req)                
          wx.request({
            url: API_URL_CAI,
            data: newInfo,
            header: { 'Content-Type': 'application/json' },
            success (res) {
              // callback(null, res.data)
              console.log(res.data)
              wx.showToast({
                title: '脚下留情',
                icon: 'success',
                duration: 2000
              })         
            },
            fail (e) {
              callback(e)
            }
          })            
  			}
  		}
  	}
  	this.setData({
  		req: list
  	})
  },

  onLoad () {

  	var that = this

    // app.fetchApi (API_URL,(err,data) => {
    //   that.setData({
    //     req: data
    //   })
    // })

    app.fetchApi (API_URL_JOKE,(err,data) => {
      that.setData({
        joke: data
      })
    })

    app.fetchApi (API_URL_PIC,(err,data) => {
      that.setData({
        req: data,
        pic: data
      })
      console.log(that.data.req)
    })        

    wx.getSystemInfo({
      success: function(res){
        that.setData({
          swiperHeight: res.windowHeight-44
        })
      }
    })   

  }
})

