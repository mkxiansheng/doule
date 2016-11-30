//app.js
App({

  // 全局数据对象(整个应用程序共享)

  globalData:{
    userInfo:null,
    collectionMsg: [],
    req: []
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

  setClt: function (cb){
    var that = this
    var list = that.globalData.collectionMsg;
    list.push(cb)
    that.globalData.collectionMsg = list;
  },

  addReq: function(cd,add){

    var that = this
    var list = that.globalData.req

    if (add=='add') {
      list.unshift(cd)
      this.globalData.req = list
    }else{
      typeof cd == 'function' && cd(that.globalData.req)
    }

    console.log(that.globalData.req)

  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  // 生命周期方法

  onLaunch: function () {
    // 应用程序启动时触发一次
    console.log('App Launch')

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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