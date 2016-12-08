//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
  	userInfo: {},
    mylist: [{
    	url: '../../images/add.png',
    	name: '我的趣事'
    }
    ]
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
