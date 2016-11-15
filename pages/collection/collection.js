//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    dec: "暂无收藏!",
    req: []
  },
  onLoad () {

    var that = this;

    app.getClt(function(collectionMsg){
      that.setData({
       dec: '',
       req: collectionMsg
      })
    })

  },	

})

