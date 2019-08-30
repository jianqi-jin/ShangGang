// pages/doctor/doctorDetail/doctorDetail.js
const util = require('../../../utils/util.js')
const {
  getFwInfo,
  payMentWz
} = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: ['空闲', '忙碌'],
    dialogShowFlag: false,
    type: 0,
    typeText: ['图文问诊', '视频问诊'], //类型文本
    typePage: ['textChat', 'videoChat'], //类型页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断options是什么类型
    let type = options.type;
    this.setData({
      ...this.data,
      ...options
    })
    getFwInfo({
      ...this.data,
      doc_id: this.data.doctorId
    }).then(res => {
      console.log(res)
      if (res.data.status == 0) {
        let data = res.data.code;
        this.setData({
          ...this.data,
          ...data
        })
      }
    })
    // if (type == 0) {
    //   //图文
    //   this.setData({
    //     type: 0
    //   })
    // } else {
    //   //视频
    //   this.setData({
    //     type: 1
    //   })
    //}
    wx.setNavigationBarTitle({
      title: this.data.typeText[type]
    })
  },
  formSubmit(e) {
    let data = e.detail.value;
    //验证表单
    for (const key in data) {
      if (!data[key]) {
        wx.showToast({
          title: '请填写完整',
          duration: 800,
          icon: 'none'
        })
        return
      }
    }
    let order_price = this.data.doc_spwz || this.data.doc_twwz;
    let money = Number(order_price) - Number(this.data.doc_ye)
    data = {
      ...data,
      money,
      order_price,
      order_type: this.data.type,
      doc_id: this.data.doc_id
    }
    payMentWz(data).then(res => {
      console.log(res)
      wx.requestPayment({
        ...res.data.code,
        success: res => {
          let type = this.data.type;
          util.navigateTo({
            url: '/pages/chat/' + this.data.typePage[type] + '/' + this.data.typePage[type]
          })
        },
        fail: res => {
          wx.showToast({
            title: '用户取消',
            icon: 'none',
            image: '',
            duration: 800,
          })
        }
      })
    })
  },
  onDialogAction(e) {
    let type = e.detail.type;
    if (type == 'close') {
      this.setData({
        dialogShowFlag: false
      })
    }
  },
  showDialog() {
    //如果第二次进入则直接跳进聊天界面
    let { typePage, type, mf_type} = this.data;
    if (mf_type == 1) {
      util.navigateTo({
        url: '/pages/chat/' + typePage[type] + '/' + typePage[type]
      })
      return
    }
    this.setData({
      dialogShowFlag: true
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
  onShow: function () {

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