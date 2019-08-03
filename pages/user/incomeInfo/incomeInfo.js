// pages/money/money.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    leiji_money: 0.00,
    fxType: ['直接', '间接'],
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
  onLoad: function(options) {
    this.setData ({
      leiji_money: getApp().globalData.leiji_money
    })
    wx.setNavigationBarTitle({
      title: '收益明细'
    })
    this.getShouyi()

  },
  getShouyi() {
    this.setData({
      loading: true
    })
    api.getShouyi(app.globalData.openid, {
      type: this.data.showId
    }).then(res => {
      console.log(res)
      this.setData({
        loading: false
      })
      if (res.data.error != "0") {
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'none',
        //   image: '',
        //   duration: 800,
        //   mask: true
        // })

        this.setData({
          infoList: []
        })
        return
      }
      this.setData({
        infoList: res.data.bonus_log,
        leiji_money: res.data.leiji_money
      })
    })
  },
  changeNav(ev) {
    let id = ev.currentTarget.dataset.id;
    this.setData({
      showId: id
    })
    this.getShouyi();
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