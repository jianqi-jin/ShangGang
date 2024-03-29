// pages/pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [{
      id: 0,
      title: '联系客服',
      iconArr: '/res/icon/doc-icon-left@3x.png',
      icon: '/res/icon/zixun@2x.png',
      type: 'call'
    }, {
      id: 0,
      title: '邀请验证码',
      iconArr: '/res/icon/doc-icon-left@3x.png',
      icon: '/res/icon/zixun@2x.png',
      type: 'navTo'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  infoClick(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item;
    if (item.type == 'call') {
      wx.makePhoneCall({
        phoneNumber: '88888888',
      })
    } else {
      wx.navigateTo({
        url: './refer/refer'
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})