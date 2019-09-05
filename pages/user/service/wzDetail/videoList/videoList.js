// pages/user/service/wzDetail/videoList/videoList.js
const {
  getVideoHistory
} = require('../../../../../utils/api.js')
const {
  showToast
} = require('../../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ...this.data,
      ...options
    })
    this.getVideoHistory()
  },
  getVideoHistory() {
    let {
      page,
      docId
    } = this.data
    getVideoHistory({
      page,
      doc_id: docId
    }).then(res => {
      if (res.data.code.list.length < 1) {
        showToast('空空如也哟~')
        return
      }
      this.setData({
        ...res.data.code
      })
    }).catch(e => {
      showToast('空空如也哟~')
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