// pages/format/format.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: "0",

    items: [
      { name: '2', value: '2' },
      { name: '8', value: '8' },
      { name: '10', value: '10', checked: 'true'},
      { name: '16', value: '16' },
      { name: '反', value: '反' },
      { name: '补', value: '补' },
      { name: 'ASC', value: 'AS' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value;
    var pos = e.detail.cursor;
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos);
      //计算光标的位置
      pos = left.replace(/11/g, '2').length;
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }
    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '进制转换-Big科技堂',
      desc: '小程序，大科技!',
      path: "pages/format/format"
    }
  },
})