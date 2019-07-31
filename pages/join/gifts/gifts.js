// pages/join/gifts/gifts.js
const app = getApp();
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0, //0确认 1立即支付
    btnTitle: ['下一步', '立即支付199元'],
    detailContent: '',
    currentGift: {},
    addressInfo: {},
    infoFlag: false,
    orderFlag: false,
    selectedIndex: 0,
    giftList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '加入合伙人'
    })
    this.getGiftList();
    this.getUpgreadUpInfo()

  },
  showInfo(ev) {
    console.log(ev.currentTarget.dataset.index);
    wx.showLoading({
      title: '数据加载中..',
      mask: true,
    })
    api.getGiftInfo(app.globalData.openid, {
      gift_id: this.data.giftList[ev.currentTarget.dataset.index].id
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.data.error != "0") {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
        return
      } else if (res.data.gift.content.length > 0) {
        this.setData({
          detailContent: res.data.gift.content
        })

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#7a7a7a'
        })
        this.setData({
          infoFlag: true
        })


      } else {
        wx.showToast({
          title: '数据空',
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
      }
    })

  },
  getUpgreadUpInfo() {
    let upgreadInfo = wx.getStorageSync('upgreadInfo');
    //if (upgreadInfo) {} else {
    api.getUpgreadUpInfo(app.globalData.openid).then(res => {
      console.log(res)
      wx.setStorageSync('upgreadInfo', res.data)
      this.setData({
        upgreadInfo,
        ['btnTitle[1]']: '立即支付' + upgreadInfo.cwdl_money + '元'
      })
    })
    //}
  },
  agentPay() {
    return new Promise(resolve => {

      let data = {
        pay_money: this.data.upgreadInfo.cwdl_money, //价格
        gift_id: this.data.currentGift.id,
        address_id: this.data.addressInfo.id
      }
      api.agentPay(app.globalData.openid, data).then(res => {
        console.log(res)
        if (res.data.error != "0") {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            image: '',
            duration: 800,
            mask: true
          })
          return
        }
        app.globalData.order_id = res.data.order_id;

        wx.requestPayment({
          timeStamp: res.data.wechat.timeStamp,
          nonceStr: res.data.wechat.nonceStr,
          package: res.data.wechat.package,
          signType: res.data.wechat.signType,
          paySign: res.data.wechat.paySign,
          success: (res2) => {
            wx.setNavigationBarColor({
              frontColor: '#000000',
              backgroundColor: '#7a7a7a'
            })
            this.setData({
              orderFlag: true
            })
            wx.redirectTo({
              url: '/pages/join/paySuccess/paySuccess?id=' + res.data.order_id
            })
            console.log(res)
            resolve(res)
          },
          fail: (res) => {
            wx.showToast({
              title: '用户取消',
              icon: 'none',
              duration: 800,
              mask: true
            })
          }
        })


        resolve(res)
      })
    })
  },
  showOrder() {
    if (this.data.status == 1) {
      //检查表单
      if (!this.data.addressInfo || !this.data.addressInfo.realname) {
        wx.showToast({
          title: '收货地址空',
          icon: 'none'
        })
      } else if (!this.data.currentGift || !this.data.currentGift.title) {
        wx.showToast({
          title: '礼物空',
          icon: 'none'
        })
      } else {
        //支付

        this.agentPay().then(res => {
          console.log(res)
        })
        return


      }
    } else {
      this.setData({
        status: 1
      })
    }


    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7a7a7a'
    })
    this.setData({
      orderFlag: true
    })
  },
  closeInfo() {
    return new Promise(resolve => {
      this.setData({
        status: 0
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
      this.setData({
        infoFlag: false,
        orderFlag: false
      })
      return
    })
  },
  chooseGift(ev) {
    let index = ev.currentTarget.dataset.index;
    this.setData({
      giftList: this.data.giftList.map((val, i) => {
        return val.checked = i == index, val;
      })
    })
    this.data.giftList.map((val, index) => {
      if (val.checked) {
        this.setData({
          currentGift: val
        })
      }
    })

  },
  getGiftList() {
    api.getGiftList(app.globalData.openid).then(res => {
      console.log(res);
      this.setData({
        giftList: res.data.gift_list
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
    if (app.globalData.currentAddress) {
      this.setData({
        addressInfo: app.globalData.currentAddress
      })
      app.globalData.currentAddress = null;
    } else {
      this.getDefaultAddress();
    }
  },
  getDefaultAddress() {
    api.getDefalutAdderss(app.globalData.openid).then(res => {
      res.data.address.isdefault = "1"
      console.log(res)
      this.setData({
        addressInfo: res.data.address
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
})