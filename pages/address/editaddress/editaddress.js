// pages/address/editaddress/editaddress.js
const app = getApp();
const api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: app.globalData.themeColor,
    addressInfo: {},
    subLoading: false,
    address0: 'asd',
    region: ['', '', ''],
    radioLabel: [{
      name: '0',
      value: '家',
      checked: true
    }, {
      name: '1',
      value: '公司'
    }],
    radioSex: [{
      name: '0',
      value: '先生',
      checked: true
    }, {
      name: '1',
      value: '女士'
    }],
    pageTitle: '添加地址',
    addressId: ''

  },
  formSubmit(ev) {
    console.log(ev)
    this.setData({
      subLoading: true
    })
    let data = ev.detail.value;
    console.log(data)
    let obj = {};
    for (let item in data) {
      console.log(item)
      if (item == 'address0') {
        obj.province = data[item][0]
        obj.city = data[item][1]
        obj.area = data[item][2]
      } else {
        if (item == 'isdefault') {
          obj[item] = data[item] ? '1' : '0'
        } else {
          obj[item] = data[item]
        }
      }
    }
    if (this.data.addressId){
      obj.address_id = this.data.addressId;
      api.editAddress(app.globalData.openid, obj).then(res => {
        this.setData({
          subLoading: false
        })
        console.log(res)
        let temp = res.data;
        if (!temp || temp.error != '0') {
          wx.showToast({
            title: temp.message,
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: 'OK'
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }else{
      api.addAddress(app.globalData.openid, obj).then(res => {
        console.log(obj)
        this.setData({
          subLoading: false
        })
        console.log(res)
        let temp = res.data;
        if (!temp || temp.error != '0') {
          wx.showToast({
            title: temp.message,
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: 'OK'
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
    

  },
  bindRegionChange(ev) {
    let region = ev.detail.value
    this.setData({
      region
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let addressId = options.addressId;
    let pageTitle = '添加新地址';
    if (addressId) {
      pageTitle = '修改地址';
      let addressInfo = wx.getStorageSync('addressInfo');
      this.setData({
        addressId,
        pageTitle,
        addressInfo,
        radioLabel: this.data.radioLabel.map((val, index) => {
          return val.checked = val.name == addressInfo.type ,val
        }),
        radioSex: this.data.radioSex.map((val, index) => {
          return val.checked = val.name == addressInfo.sex, val
        }),
        region: [
          addressInfo.province,
          addressInfo.city,
          addressInfo.area
        ]

      })
    }

    wx.setNavigationBarTitle({
      title: pageTitle,
    })
  },
  radioChange(ev) {
    let index = ev.detail.value;
    let obj = ev.currentTarget.dataset.obj;
    this.setData({
      [obj]: this.data[obj].map((value, index1) => {
        return value.checked = index1 == index ? true : false, value;
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
  onShow: function() {},

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