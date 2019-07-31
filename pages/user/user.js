// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderBtnList: [{
      title: '全部订单',
      icon: '/res/icon/order-01@3x.png',
      url: '/pages/order/orderList/orderList'
    }, {
      title: '待付款',
      icon: '/res/icon/order-02@3x.png',
      url: '/pages/order/orderList/orderList'
    }, {
      title: '待收货',
      icon: '/res/icon/order-03@3x.png',
      url: '/pages/order/orderList/orderList'
    }, {
      title: '已完成',
      icon: '/res/icon/order-04@3x.png',
      url: '/pages/order/orderList/orderList'
    }, {
      title: '已取消',
      icon: '/res/icon/order-05@3x.png',
      url: '/pages/order/orderList/orderList'
    }],
    serviceBtnList: [{
        title: '我的问诊',
        icon: '/res/icon/order-06@3x.png',
        url: ''
      },
      {
        title: '我的药单',
        icon: '/res/icon/order-07@3x.png',
        url: ''
      }
    ],
    infoList: [{
        iconImg: '/res/icon/icon-add@3x.png',
        title: '收货地址',
        iconArr: '/res/icon/doc-icon-left@3x.png'
      },
      {
        iconImg: '/res/icon/icon-ser@3x.png',
        title: '联系客服',
        iconArr: '/res/icon/doc-icon-left@3x.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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