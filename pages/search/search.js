// pages/search/search.js
const util = require('../../utils/util.js')
const {
  getDoctorList
} = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getDoctorList().then(res => {
      console.log(res)
      if (res.data.status == 0) {
        let data = res.data.code;
        this.setData({
          doctorList: data.data
        })
      }
    })
  },
  onSearchAction(e) {
    let item = e.detail;
    if (item.type == 'change') {
      this.setData({
        inputText: item.data
      })
    }
  },
  doctorItemClick(e) {
    let item = e.currentTarget.dataset.item;
    util.navigateTo({
      url: '/pages/doctor/doctorDetail/doctorDetail?doctorId=' + item.doc_id
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