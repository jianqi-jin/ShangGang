// pages/doctor/doctorDetail/doctorDetail.js
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShowFlag: false,
    type: 0,
    typeText: ['图文问诊', '视频问诊'], //类型文本
    typePage: ['textChat', 'videoChat'], //类型页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 判断options是什么类型
    let type = options.type;
    this.setData({
      type
    })
    // if (type == 0) {
    //   //图文
    //   this.setData({
    //     type: 0
    //   })
    // } else {
    //   //视频
    //   this.setData({
    //     type: 1
    //   })
    //}
    wx.setNavigationBarTitle({
      title: this.data.typeText[type]
    })
  },
  onDialogAction(e) {
    let type = e.detail.type;
    if (type == 'close') {
      this.setData({
        dialogShowFlag: false
      })
    }
  },
  showDialog() {
    this.setData({
      dialogShowFlag: true
    })
  },
  payBtnClick() {
    let type = this.data.type;
    util.navigateTo({
      url: '/pages/chat/' + this.data.typePage[type] + '/' + this.data.typePage[type]
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