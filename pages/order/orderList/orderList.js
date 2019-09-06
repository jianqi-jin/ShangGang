// pages//order/orderList/orderList.js
const util = require('../../../utils/util.js')
const {
  getOrderList,
  orderDelete,
  orderCancel,
  orderSuccess,
  orderPay
} = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusTitle: ['待付款', '已付款', '待收货', '已完成', '已取消'],
    page: 0,
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
    this.setData({
      'navTitleInfo.currentNavIndex': options.currentNavIndex
    })
  },
  onItemClick(e) {
    let {
      item
    } = e.currentTarget.dataset;
    util.navigateTo({
      url: '/pages/order/orderDetail/orderDetail?orderId=' + item.order_id
    })
  },
  getOrderList(typeFirst = 0) { //0重新加载  1继续加载，分页
    if (typeFirst == 0) {
      this.setData({
        page: 0
      })
    }
    let {
      currentNavIndex,
    } = this.data.navTitleInfo;
    getOrderList({
      zt_type: currentNavIndex,
      page: this.data.page + 1
    }).then(res => {
      console.log(res)
      this.setData({
        orderList: typeFirst == 0 ? (res.data.code.list || []) : [...this.data.orderList, ...(res.data.code.list || [])],
        page: this.data.page + 1
      })
      if (!res.data.code.list) {
        util.showToast('没有更多了哟~')
      }
    }).catch(e => {
      util.showToast('没有更多了哟~')
    })
  },
  onNavChange(e) {
    let id = e.detail.id;
    this.setData({
      ['navTitleInfo.currentNavIndex']: id
    })
    this.getOrderList()
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
    this.getOrderList()
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
    this.getOrderList(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },









  orderShowWl(e) {
    let {
      order_id
    } = e.currentTarget.dataset;
    // order_idShowWl({
    //   order_id
    // }).then(res => {
    //   console.log(res)
    // })
  },
  orderCancel(e) {
    wx.showLoading({
      title: '取消',
    })
    console.log(e)
    let {
      order_id
    } = e.currentTarget.dataset;
    orderCancel({
      order_id
    }).then(res => {
      wx.hideLoading()
      if (res.data.code == 1) {
        util.showToast('取消成功')
        this.getOrderList()
      }
      console.log(res)
    })
  },
  orderPay(e) {
    let {
      order_id,
      cf_ye_money
    } = e.currentTarget.dataset;
    orderPay({
      order_id,
      cf_ye_money
    }).then(res => {
      console.log(res)
    })
  },
  orderDelete(e) {
    wx.showLoading({
      title: '删除',
    })
    console.log(e)
    let {
      order_id
    } = e.currentTarget.dataset;
    orderDelete({
      order_id
    }).then(res => {
      wx.hideLoading()
      if (res.data.code == 1) {
        this.getOrderList()
      }
      console.log(res)
    })
  },
  orderSuccess(e) {
    wx.showLoading({
      title: '确认收货',
    })
    let {
      order_id
    } = e.currentTarget.dataset;
    orderSuccess({
      order_id
    }).then(res => {
      wx.hideLoading()
      this.getOrderList()
      console.log(res)
    })
  }
})