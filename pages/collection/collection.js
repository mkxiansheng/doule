//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    dec: "暂无收藏!",
    req: [{
    	"content":"女生分手的原因有两个， 一个是：闺蜜看不上。另一个是：闺蜜看上了。",
    	"hashId":"607ce18b4bed0d7b0012b66ed201fb08",
    	"unixtime":1418815439,
    	"updatetime":"2014-12-17 19:23:59",
    	"zan": 99,
    	"cai": 22
    }]
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

