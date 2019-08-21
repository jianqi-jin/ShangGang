// pages/chat/textChat/textChat.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 99999999, //滚动到底部
    mesInfoList: [{
      id: 0,
      type: 0,
      msg: '根据病因，需要先了解一下是那种类型？'
    }, {
      id: 0,
      type: 1,
      msg: '根据病因，需要先了解一下是那种类型？'
    }, {
      id: 0,
      type: 0,
      msg: '根据病因，需要先了解一下是那种类型？'
    }, {
      id: 0,
      type: 0,
      msg: '根据病因，需要先了解一下是那种类型？'
    }, {
      id: 0,
      type: 1,
      msg: '根据病因，需要先了解一下是那种类型？'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onAction(e) {
    let item = e.detail
    if (item.type == 'send') {
      this.scrollToBottom()
    }
  },
  scrollToBottom() {
    this.setData({
      scrollTop: this.data.scrollTop
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})