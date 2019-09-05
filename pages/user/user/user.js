// pages/user/user.js
const util = require('../../../utils/util.js')
const {
  getUserPageData,
  getKefuPhone
} = require('../../../utils/api.js')
const {
  auth
} = require('../../../utils/api.js')
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
        url: '/pages/user/service/service?type=0'
      },
      {
        title: '我的药单',
        icon: '/res/icon/order-07@3x.png',
        url: '/pages/user/service/service?type=1'
      }
    ],
    infoList: [{
        iconImg: '/res/icon/icon-tg@3x.png',
        title: '推广中心',
        iconArr: '/res/icon/doc-icon-left@3x.png'
      }, {
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
    this.setData({
      token: wx.getStorageSync('token'),
      // ...wx.getStorageSync('userInfo')
    })
    this.getUserPageData()
  },
  getUserPageData() {
    getUserPageData().then(res => {
      getKefuPhone().then(res2 => {
        this.setData({
          ...res.data.code,
          ...res2.data.code
        })
      })
    })
  },
  loginClick(e) {
    let userInfo = e.detail.userInfo;
    // this.setData({
    //   ...userInfo
    // })
    auth({
      wx_url: userInfo.avatarUrl,
      wx_name: userInfo.nickName,
      accid: wx.getStorageSync('accid')
    }).then(res => {
      if (res.data.status == 0) {
        let data = res.data.code;
        wx.setStorageSync('userInfo', userInfo)
        this.setData({
          token: data.token
        })
        wx.setStorageSync('token', data.token)
        this.getUserPageData()
      }
    })
  },
  infoItemClick(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item)
    switch (item.title) {
      case '收货地址':
        {
          util.navigateTo({
            url: '/pages/address/address'
          })
          break;
        }
      case '联系客服':
        {
          wx.makePhoneCall({
            phoneNumber: this.data.kf_tel,
          })
          break;
        }
      case '推广中心':
        {
          util.navigateTo({
            url: '/pages/user/referCenter/referCenter'
          })
          break;
        }
    }
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