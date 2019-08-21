// pages/money/money.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: "",
    loadingFlag: false,
    showId: 0,
    navList: [{
      title: '推荐下单奖励',
      id: 0
    }, {
      title: '储存预存金额',
      id: 1
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bgImg: app.globalData.mx_img
    })
    wx.setNavigationBarTitle({
      title: '奖金明细'
    })
    this.getYueDetails();
  },
  getYueDetails() {
    this.setData({
      loadingFlag: true
    })
    api.getYueDetails(app.globalData.openid, {
      type: this.data.showId
    }).then(res => {
      this.setData({
        loadingFlag: false
      })
      console.log(res)
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true
        })
        this.setData({
          userInfo: {},
          cardList: []
        })

        return
      }
      this.setData({
        userInfo: res.data.info,
        cardList: res.data.log_list
      })
    })
  },
  changeNav(ev) {
    let id = ev.currentTarget.dataset.id;
    this.setData({
      showId: id
    })
    this.getYueDetails()
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