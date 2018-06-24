//about.js
//获取应用实例
var app = getApp()
Page({
  data: {
   
  },
  onShareAppMessage: function () {
    return {
      title: '关于-Big科技堂',
      desc: '小程序，大科技!',
      path: "pages/about/about"
    }
  },
  onLoad: function () {
    console.log('onLoad')
   
  }
})
