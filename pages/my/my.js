//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  	userInfo: {},
    name: 'mk先生',
    pic_url: '../../images/my-code.png',
    github: 'https://github.com/mkxiansheng/doule'
  },
  onLoad: function () {

  	var that = this
  	
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })   

  }
})
