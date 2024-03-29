// pages/address/editaddress/editaddress.js
const app = getApp();
const { addAddress, editAddress } = require('../../../utils/api.js');
const {
  isPoneAvailable
} = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '',
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
    let data = ev.detail.value;
    console.log(data)
    try {

      if (!isPoneAvailable(data.address_mobile)) {
        throw '手机号格式错误'
      }
      if (!data.address_realname) {
        throw '联系人不能为空'
      }
      if (!data.address_add) {
        throw '详细地址不能为空'
      }
      if (!data.address0[0]) {
        throw '地址不能为空'
      }
    } catch (e) {
      wx.showToast({
        title: e.toString(),
        icon: 'none',
        image: '',
        duration: 800,
      })
      return
    }

    this.setData({
      subLoading: true
    })
    console.log(data)
    let obj = {};
    for (let item in data) {
      console.log(item)
      if (item == 'address0') {
        obj.address_province = data[item][0]
        obj.address_city = data[item][1]
        obj.address_area = data[item][2]
      } else {
        if (item == 'isdefault') {
          obj[item] = data[item] ? '1' : '0'
        } else {
          obj[item] = data[item]
        }
      }
    }
    if (this.data.addressId) {
      obj.address_id = this.data.addressId;
      editAddress(obj).then(res => {
        this.setData({
          subLoading: false
        })
        console.log(res)
        let temp = res.data;
        if (!temp || temp.status != 0) {
          wx.showToast({
            title: temp.msg,
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
    } else {
      addAddress(obj).then(res => {
        console.log(obj)
        this.setData({
          subLoading: false
        })
        console.log(res)
        let temp = res.data;
        if (!temp || temp.status != 0) {
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
  onLoad: function (options) {
    console.log(options)
    this.setData({
      color: '#973F2B'//app.globalData.themeColor.split(';')[0]
    })
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
          return val.checked = val.name == addressInfo.type, val
        }),
        radioSex: this.data.radioSex.map((val, index) => {
          return val.checked = val.name == addressInfo.sex, val
        }),
        region: [
          addressInfo.address_province,
          addressInfo.address_city,
          addressInfo.address_area
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

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