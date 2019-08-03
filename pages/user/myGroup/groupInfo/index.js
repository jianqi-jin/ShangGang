// pages/user/myGroup/groupInfo/index.js
const app = getApp()
const api = require('../../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
    loadFlag: false,
    showId: 1,
    navList: [{
      id: 1,
      title: '代理团队',
    }, {
      id: 0,
      title: '会员粉丝'
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      color: app.globalData.themeColor
    })
    wx.setNavigationBarTitle({
      title: '团队明细',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.getTeamDetail(1)

  },
  getTeamDetail(index) {

    this.setData({
      loadFlag: true
    })
    api.getTeamDetail(app.globalData.openid, {
      type: index
    }).then(res => {
      this.setData({
        infoList: res.data.new_arr || []
      })
      this.setData({
        loadFlag: false
      })
      console.log(res)
      if (res.data.error != "0" || res.data.new_arr.length < 1) {
        // wx.showToast({
        //   title: res.data.message || "未查找到相关信息",
        //   icon: 'none',
        //   image: '',
        //   duration: 800,
        //   mask: true,
        // })
      }


    })
  },
  changeNav(ev) {
    let index = ev.currentTarget.dataset.id;
    this.setData({
      showId: index
    })
    this.getTeamDetail(index)
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