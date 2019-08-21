// pages/join/paySuccess/paySuccess.js
const app = getApp()
const api = require("../../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加入合伙人'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#824C1F'
    })
    this.setData({
      order_id: options.id
    })
    this.getOrderInfo()

  },
  getOrderInfo(){
    api.getOrderInfo(app.globalData.openid,{order_id:this.data.order_id}).then(res => {
      res.data.cwdl_money = wx.getStorageSync("upgreadInfo").cwdl_money;
      this.setData({
        info:res.data
      })
    })
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

  }
})