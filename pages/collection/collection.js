//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    dec: "暂无收藏!",
    req: []
  },
  onLoad () {

  	var list = []
  	var wx_req = wx.getStorageSync('wx_req')
  	list.push(wx_req)
  	this.setData({
  		dec: '',
  		req: list
  	})

  },	

})

