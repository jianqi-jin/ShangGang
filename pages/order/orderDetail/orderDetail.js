// pages/order/orderDetail/orderDetail.js
const {
  getOrderSuccDetail
} = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  }
})