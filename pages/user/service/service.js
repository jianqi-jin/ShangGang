// pages/user/service/service.js
const util = require('../../../utils/util.js')
const {
  getServiceList,
  getYdList
} = require('../../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    page: 0,
    zxType: ['未咨询', '已咨询', '未咨询'], //图文
    jtType: ['未接通', '已接通', '未接通'], //视频
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
  getServiceList(typeFirst = 0) {
    let {
      currentNavIndex
    } = this.data.navTitleInfo
    let {
      page,
      type
    } = this.data
    let _tempFun = type == 0 ? getServiceList : getYdList //选择函数，是服务列表还是姚丹列表
    _tempFun({
      wz_type: currentNavIndex,
      page: ++page
    }).then(res => {
      console.log(res)
      this.setData({
        serviceList: typeFirst == 0 ? res.data.code.list : [...this.data.serviceList, ...res.data.code.list],
        page
      })
    }).catch(e => {
      console.log(e)
      util.showToast('没有更多了哟~')
    })
  },
  itemClick(e) {
    let item = e.currentTarget.dataset.item;
    let uri = this.data.type == 0 ? 'wzDetail/wzDetail' : 'ydDetail/ydDetail'
    util.navigateTo({
      url: '/pages/user/service/' + uri + '?order_id=' + item.order_id // + '&order_pid=' + item.sj_pid
    })
  },
  onNavChange(e) {
    let id = e.detail.id;
    console.log(e)
    this.setData({
      ['navTitleInfo.currentNavIndex']: id,
      page: 0
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
    this.getServiceList(1) //0或者null是首次加载  1是二次加载
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})