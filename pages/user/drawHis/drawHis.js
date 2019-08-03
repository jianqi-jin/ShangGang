// pages/user/drawHis/drawHis.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawHisList: [],
    status: [
      '待审核',
      '待打款',
      '已完成',
      '审核未通过'
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提现明细',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.getDrawHis();

  },
  getDrawHis(){
    api.getDrawHis(app.globalData.openid).then(res => {
      if(res.data != "0"){
        this.setData({
          drawHisList: res.data.tixian_list
        })
      }else{
        wx.showToast({
          title: res.data.error,
          icon: 'none',
          image: '',
          duration: 0,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
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