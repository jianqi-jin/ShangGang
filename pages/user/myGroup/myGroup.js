// pages/user/myGroup/myGroup.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderInfo: [{
        'title': '今日',
        'value': 0
      },
      {
        'title': '本周',
        'value': 0
      },
      {
        'title': '本月',
        'value': 0
      },
      {
        'title': '累计',
        'value': 0
      }
    ],

    groupInfo: [{
        'title': '今日',
        'value': 0
      },
      {
        'title': '本周',
        'value': 0
      },
      {
        'title': '本月',
        'value': 0
      },
      {
        'title': '累计',
        'value': 0
      }
    ],

    groupNumInfo: [{
        'title': '今日',
        'value': 0
      },
      {
        'title': '本周',
        'value': 0
      },
      {
        'title': '本月',
        'value': 0
      },
      {
        'title': '累计',
        'value': 0
      }
    ],



    infoList: [{
      infoTitle: '推荐人',
      infoValue: '无'
    }, {
      infoTitle: '注册时间',
      infoValue: '0'
    }, {
      infoTitle: '累计提现',
      infoValue: '￥0'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bgImg: app.globalData.my_team_img
    })
    wx.setNavigationBarTitle({
      title: '我的团队'
    })
    this.getMyTeam()
  },
  getMyTeam() {
    api.getMyTeam(app.globalData.openid).then(res => {
      console.log(res)
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      } else {
        this.data.infoList[0].infoValue = res.data.info.nickname?("[" + res.data.info.levelname + "]" + res.data.info.nickname):"无"
        this.data.infoList[1].infoValue = res.data.info.create_time
        this.data.infoList[2].infoValue = res.data.info.ytx_money

        let orderInfoNet = res.data.order_money
        let groupNet = res.data.team_order
        let groupNumInfoNet = res.data.team_user

        let orderInfo = this.data.orderInfo
        let groupInfo = this.data.groupInfo
        let groupNumInfo = this.data.groupNumInfo

        orderInfo[0].value = orderInfoNet.today
        orderInfo[1].value = orderInfoNet.week
        orderInfo[2].value = orderInfoNet.month
        orderInfo[3].value = orderInfoNet.all

        groupInfo[0].value = groupNet.today_order
        groupInfo[1].value = groupNet.week_order
        groupInfo[2].value = groupNet.month_order
        groupInfo[3].value = groupNet.all_order

        groupNumInfo[0].value = groupNumInfoNet.today_team
        groupNumInfo[1].value = groupNumInfoNet.week_team
        groupNumInfo[2].value = groupNumInfoNet.month_team
        groupNumInfo[3].value = groupNumInfoNet.all_team

        this.setData({
          teamInfo: res.data,
          infoList: this.data.infoList,
          orderInfo,
          groupInfo,
          groupNumInfo
        })

      }
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