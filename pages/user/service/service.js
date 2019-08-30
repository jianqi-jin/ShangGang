// pages/user/service/service.js
const util = require('../../../utils/util.js')
const {
  getServiceList
} = require('../../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    zxType: ['未咨询', '已咨询', '未咨询'],//图文
    jtType: ['未接通', '已接通', '未接通'],//视频
    navTitleInfo: {
      type: 'left', //center 或者 left
      currentNavIndex: 0,
      navList: [{
        id: 0,
        title: '图文问诊'
      }, {
        id: 1,
        title: '视频问诊'
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type;
    this.setData({
      type
    })
    this.getServiceList()
  },
  getServiceList() {
    let {
      currentNavIndex
    } = this.data.navTitleInfo
    getServiceList({
      wz_type: currentNavIndex
    }).then(res => {
      console.log(res)
      this.setData({
        serviceList: res.data.code.list
      })
    })
  },
  itemClick(e) {
    let item = e.currentTarget.dataset.item;
    let uri = this.data.type == 0 ? 'wzDetail/wzDetail' : 'ydDetail/ydDetail'
    util.navigateTo({
      url: '/pages/user/service/' + uri + '?order_id=' + item.order_id
    })
  },
  onNavChange(e) {
    let id = e.detail.id;
    console.log(e)
    this.setData({
      ['navTitleInfo.currentNavIndex']: id
    })
    this.getServiceList()
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