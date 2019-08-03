// pages/user/draw/draw.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: 0,
    ktx_money: 0,
    dialogFlag: false,
    bankCard: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '提现',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    if (options.cardId) {
      this.getCard(options.cardId);
    } else {
      this.getDefaultCard();
    }
  },
  qbTxFun() {
    this.setData({
      inputVal: this.data.ktx_money
    })
  },
  submitFun(ev) {
    console.log()
    if (!this.data.bankCard.card_id) {
      wx.showToast({
        title: '银行卡空',
        icon: 'none',
        image: '',
        duration: 800,
        mask: true
      })
      return
    } else if (ev.detail.value.money == 0 || !ev.detail.value.money) {
      wx.showToast({
        title: '提现金额为空',
        icon: 'none',
        image: '',
        duration: 800,
        mask: true
      })
      return

    }
    api.tixian(app.globalData.openid, {
      money: ev.detail.value.money,
      card_id: this.data.bankCard.card_id
    }).then(res => {
      if (res.data.error == "0") {
        this.setData({
          dialogFlag: true
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true
        })
      }
    })
  },
  fucActttt() {
    console.log(this.data.inputVal)
    //
    //提现
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
    //读取提现金额
    let money = wx.getStorageSync('money');
    this.setData({
      ktx_money: money.ktx_money
    })
    if (app.globalData.cardInfo) {
      //从全局读取
      this.getCardFromGlobal();
      app.globalData.cardInfo = null
    } else if (!this.data.bankCard.card_id && !app.globalData.cardInfo) {
      //都没有读取默认
      this.getDefaultCard();
    }
  },
  getCardFromGlobal() {
    app.globalData.cardInfo.number = app.globalData.cardInfo.number.substr(-4)
    this.setData({
      bankCard: app.globalData.cardInfo
    })

    /*
        api.getCard(app.globalData.openid, {card_id: cardId}).then(res => {
          console.log(res)
          res.data.bank_card.number = res.data.bank_card.number.substr(-4)
          this.setData({
            bankCard: res.data.bank_card
          })
        })*/
  },
  getDefaultCard() {
    api.getDefaultCard(app.globalData.openid).then(res => {
      console.log(res)
      res.data.bank_card.number = res.data.bank_card.number.substr(-4)
      this.setData({
        bankCard: res.data.bank_card
      })
    })
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