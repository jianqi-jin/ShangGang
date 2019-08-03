// pages/money/money.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: "",
    bonus_log: [],
    showId: 0,
    navList: [{
      title: '下单奖励',
      id: 0
    }, {
        title: '招募奖励',
        id: 1
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bgImg: app.globalData.mx_img
    })
    wx.setNavigationBarTitle({
      title: '收益明细'
    })
    this.getDjInfo()
  },
  getDjInfo(){
    api.getDjInfo().then(res => {
      console.log(res)
      this.setData({
        bonus_log: res.data.bonus_log
      })
    })
  },
  changeNav(ev){
    let id = ev.currentTarget.dataset.id;
    this.setData({
      showId: id
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
    this.getDjInfo()
    let money = wx.getStorageSync("money")
    this.setData({
      dj_money: money.dj_money
    })
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