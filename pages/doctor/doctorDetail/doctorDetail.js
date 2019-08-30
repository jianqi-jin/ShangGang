// pages/doctor/doctorDetail/doctorDetail.js
const util = require('../../../utils/util.js')
const {
  getDoctorDetail
} = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: [
      '空闲',
      '忙碌'
    ],
    doctorId: '',
    doctorInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let doctorId = options.doctorId;
    this.setData({
      doctorId
    })
    getDoctorDetail({
      doc_id: doctorId
    }).then(res => {
      console.log(res)
      if (res.data.status == 0) {
        let data = res.data.code;
        //缓存医生头像
        wx.setStorageSync('docAvatar', res.data.code.doc_avatar)
        wx.setStorageSync('docName', res.data.code.doc_name)
        wx.setStorageSync('docIm', res.data.code.doc_im)
        this.setData({
          ...this.data,
          ...data
        })
      }
    })
  },
  btnItemClick(e) {
    let item = e.currentTarget.dataset.item; //图文或者视频
    let {
      zc_type
    } = this.data;
    util.navigateTo({
      url: '/pages/doctor/orderDetail/orderDetail?type=' + item + '&doctorId=' + this.data.doc_id + '&zc_type=' + zc_type
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