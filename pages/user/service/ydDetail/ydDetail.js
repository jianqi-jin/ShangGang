// pages/user/service/ydDetail/ydDetail.js
const util = require('../../../../utils/util.js')
const {
  getYdDetail
} = require('../../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ...options
    })
    getYdDetail({
      order_id: this.data.orderId,
      order_cftype_status: this.data.order_cftype_status,
      order_pid: this.data.order_pid
    }).then(res => {
      console.log(res)
      this.setData({
        ...res.data.code
      })
    })
  },
  payFuc() {
    util.navigateTo({
      url: '/pages/order/orderPayDetail/orderPayDetail?orderId=' + this.data.orderId
    })
  },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})