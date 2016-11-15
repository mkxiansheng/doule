//app.js
App({

  // 全局数据对象(整个应用程序共享)

  globalData:{
    userInfo:null,
    collectionMsg: [{
      "content":"女生分手的原因有两个， 一个是：闺蜜看不上。另一个是：闺蜜看上了。",
      "hashId":"607ce18b4bed0d7b0012b66ed201fb08",
      "unixtime":1418815439,
      "updatetime":"2014-12-17 19:23:59",
      "zan": 99,
      "cai": 22
    }]
  },
  // 应用程序全局方法
  fetchApi (api_url, callback) {

    wx.request({
      url: api_url,
      data: {},
      header: { 'Content-Type': 'application/json' },
      success (res) {
        callback(null, res.data)
      },
      fail (e) {
        callback(e)
      }
    })

  },

  getClt: function (cb) {
    var that = this
    typeof cb == "function" && cb(that.globalData.collectionMsg)
  },


  // 生命周期方法

  onLaunch: function () {
    // 应用程序启动时触发一次
    console.log('App Launch')
  },

  onShow: function () {
    // 当应用程序进入前台显示状态时触发
    console.log('App Show')
  },

  onHide: function () {
    // 当应用程序进入后台状态时触发
    console.log('App Hide')
  }
})