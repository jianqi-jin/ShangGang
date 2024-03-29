// pages/caseLib/caseDetail/caseDetail.js
const { getCaseDetail } = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ...this.data,
      ...options
    })
    getCaseDetail({ ...this.data }).then(res => {
      if (res.data.status == 0) {
        let data = res.data.code;
        let gq_img = [];
        for (const key in data.yhxx.gq_img) {
          const element = data.yhxx.gq_img[key];
          gq_img.push(element)
        }
        data.yhxx.gq_img = gq_img
        this.setData({
          ...this.data,
          paperList: data.data,
          info: data.yhxx
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