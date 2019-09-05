// pages/order/orderDetail/orderDetail.js
const {
  getOrderSuccDetail,
  orderDelete,
  orderCancel,
  orderSuccess,
  orderPay
} = require('../../../utils/api.js')
const {
  showToast
} = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusTitle: ['待付款', '已付款', '待收货', '已完成', '已取消'],
    infoList: [{
        id: 0,
        title: '订单金额',
        value: '￥110.3',
        valueStyle: 'color:#A0A0A0;'
      },
      {
        id: 1,
        title: '余额抵扣',
        value: '￥110.3',
        valueStyle: 'color:#EA4149;'
      },
      {
        id: 2,
        title: '实际支付',
        value: '￥110.3',
        valueStyle: 'color:#EA4149;'
      },
      {
        id: 3,
        title: '支付方式',
        value: '￥110.3',
        valueStyle: 'color:#A0A0A0;'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ...options
    })
    getOrderSuccDetail({
      order_id: this.data.orderId
    }).then(res => {
      let {
        order_price,
        order_price_zk,
        cf_ye_money
      } = res.data.code;
      this.setData({
        'infoList[0].value': '￥' + order_price,
        'infoList[1].value': '￥' + cf_ye_money,
        'infoList[2].value': '￥' + order_price_zk,
        'infoList[3].value': '在线支付',
        ...res.data.code
      })
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
        showToast('取消成功')
        this.onLoad(this.data)
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
        wx.navigateBack({
          delta: 1,
        })
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
      this.onLoad(this.data)
      console.log(res)
    })
  }
})