// pages/user/service/wzDetail/wzDetail.js
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [{
      iconImg: '/res/icon/icon-yyjl@3x.png',
      title: '用药建议记录',
      iconArr: '/res/icon/doc-icon-left@3x.png',
      url: '/pages/user/service/wzDetail/ydList/ydList'
    }, {
      iconImg: '/res/icon/icon-dhjl@3x.png',
      title: '问诊对话记录',
      iconArr: '/res/icon/doc-icon-left@3x.png',
      url: '/pages/chat/textChat/textChat'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  infoItemClick(e){
    let item = e.currentTarget.dataset.item;
    let url = item.url;
    util.navigateTo({url})
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