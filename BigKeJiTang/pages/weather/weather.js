//获取应用实例
var app = getApp()
Page({
  data: {
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    showday: ['今天', '明天', '后天']
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: '天气预报-Big科技堂',
      desc: '小程序，大科技!',
      path: "pages/weather/weather"
    }
  },
  //当页面加载完成
  onLoad: function () {
    var that = this;
    var date = new Date();
    console.log(date.getDay());
    that.setData({
      'showday[2]': this.data.weekday[(date.getDay() + 2) % 7]
    });
    console.log(this.data.showday);
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;//纬度
        var longitude = res.longitude;//经度
        console.log(latitude + "----" + longitude);
        that.getCity(latitude, longitude);//调用自己写的函数获得城市
      },
    })
  },
  //获得城市的函数定义
  getCity: function (lat, lng) {
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var param = {
      location: lat + "," + lng,
      output: "json",//返回的数据格式
      ak: "GPzZYsMV1EwDBtdggiNQb1tP7RyRdAP6"//地图api的ak
    };
    var that = this;
    //发出请求获取数据
    wx.request({
      url: url,
      data: param,
      success: function (res) {
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street
        });
        //调用自定义的函数获取天气信息
        city = city.substring(0, city.length - 1);//截掉最后一个字"市"
        that.getWeather(city);
      }
    })
  },
  //获取天气信息函数
  getWeather: function (city) {
    console.log(city);//注意传递的参数需是城市名或拼音等，详情见api文档，如果给的不是城市名，则无空气质量的值。城市名要去掉"市"字。
    var that = this;
    var url = "https://free-api.heweather.com/v5/weather";
    var param = {
      key: "4a555d4d1adc451d8ceeaa73869c9519",
      city: city
    };
    //发出请求
    wx.request({
      url: url,
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          // 今天天气情况数组
          now: res.data.HeWeather5[0].now, 
          // 预报天气情况数组 /
          forecast: res.data.HeWeather5[0].daily_forecast, 
          // 空气质量 
          quality:res.data.HeWeather5[0].aqi 
        });
      }
    })
  }
});