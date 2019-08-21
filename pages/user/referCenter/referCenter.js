// pages/user/referCenter/referCenter.js
const app = getApp();
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    otherInfoList: [
      {
        iconImg: '/res/icon/icon-tgzx-list1@3x.png',
        title: '代理升级',
        iconArr: '/res/icon/doc-icon-left@3x.png'
      },
      {
        iconImg: '/res/icon/icon-tgzx-list2@3x.png',
        title: '我的团队',
        iconArr: '/res/icon/doc-icon-left@3x.png'
      }
    ],
    otList: [
      {
        title: '已提现金额',
        num: 0,
        url: '/pages/user/drawHis/drawHis',
        btnTitle: '明细'
      }, {
        title: '可提现金额',
        num: 0,
        url: '/pages/user/draw/draw',
        btnTitle: '提现'
      }, {
        title: '已冻结资金',
        num: 0,
        url: '/pages/user/freeze/freeze',
        btnTitle: '明细'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bgImg: app.globalData.my_bg
    })
    wx.setNavigationBarTitle({
      title: '用户中心',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  navTo(ev){
    let index = ev.currentTarget.dataset.index;
    if(index == 0){
      wx.navigateTo({
        url: '/pages/user/levelMsg/levelMsg'
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/myGroup/myGroup'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getReferCenterInfo();
  },
  getReferCenterInfo:function (){
    api.getReferCenterInfo(app.globalData.openid).then(res => {
      console.log(res)
      if(res.data.error != "0"){
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }else{
        getApp().globalData.leiji_money = res.data.money.leiji_money;
        this.data.otList[0].num = res.data.money.ytx_money;
        this.data.otList[1].num = res.data.money.ktx_money;
        this.data.otList[2].num = res.data.money.dj_money;
        this.setData({
          otList: this.data.otList,
          userInfo: res.data
        })
        wx.setStorageSync('money', res.data.money)
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})