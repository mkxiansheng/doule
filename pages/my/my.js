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

      console.log(userInfo)
      //TODO 因为无法取到code 所以只用用户名作为标识符了 这是不可取的,只作演示
      var uname = userInfo.nickName;
      var gender = userInfo.gender;
      var avatarUrl = userInfo.avatarUrl;
      var province = userInfo.province;
      var city = userInfo.city;

      var user = {
        "uname" : uname,
        "gender" : gender,
        "avatarUrl" : avatarUrl,
        "province" : province,
        "city" : city        
      }
      console.log(user)
    })   

  }
})
