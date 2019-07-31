// pages//order/orderList/orderList.js
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitleInfo: {
      type: 'center', //center 或者 left
      currentNavIndex: 1,
      navList: [{
        id: 0,
        title: '全部'
      }, {
        id: 1,
        title: '待付款'
      }, {
        id: 2,
        title: '待发货'
      }, {
        id: 3,
        title: '已完成'
      }, {
        id: 4,
        title: '已取消'
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onItemClick(e){
    util.navigateTo({url: '/pages/order/orderDetail/orderDetail'})
  },
  onNavChange(e) {
    let id = e.detail.id;
    this.setData({
      ['navTitleInfo.currentNavIndex']: id
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