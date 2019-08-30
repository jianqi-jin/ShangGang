// pages/order/orderPayDetail/orderPayDetail.js
const util = require('../../../utils/util.js')
const {
  getDefaultAddress,
  getYdOrderDetail,
  getYdPay
} = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pay() {
    getYdPay({
      order_id: this.data.orderId,
      address_id: this.data.addressInfo.address_id
    }).then(res => {
      wx.requestPayment({
        ...res.data.code,
        success: function(res) {
          wx.navigateTo({
            url: '/pages/order/paySuccess/paySuccess?price=' + sj_money + '&orderId=' + orderId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })

        },
        fail: function(res) {
          wx.showToast({
            title: '用户取消',
            icon: 'none',
            duration: 800,
          })
        },
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ...options
    })
    getYdOrderDetail({
      order_id: this.data.orderId
    }).then(res => {
      console.log(res)
      this.setData({
        ...this.data,
        ...res.data.code
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  chooseAddress() {
    util.navigateTo({
      url: '/pages/address/address?type=2'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //从全局变量读取addressInfo
    let {
      currentAddress
    } = getApp().globalData;
    getApp().globalData.currentAddress = null;
    if (currentAddress) {
      console.log(currentAddress)
      this.setData({
        addressInfo: currentAddress
      })

    } else {
      //查询默认地址
      getDefaultAddress().then(res => {
        this.setData({
          addressInfo: res.data.code
        })
      })
    }
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