// pages/home/home.js
const {
  getDoctorList
} = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorList: [],
    banner: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().onTest()
    // wx.redirectTo({
    //   url: '/pages/pages/home/home'
    // })
    getDoctorList().then(res => {
      if (res.data.status == 0) {
        let data = res.data.code;
        let bannerObj = data.banner;
        let bannerArr = []
        for (const key in bannerObj) {
          bannerArr.push(bannerObj[key])
        }
        this.setData({
          banner: bannerArr,
          doctorList: data.data
        })
      }
    })
  },
  onSearchBarClick(e) {
    let type = e.detail.type;
    if (type == 'click') {
      util.navigateTo({
        url: '/pages/search/search'
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