// pages/home/home.js
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctorList: [{
      id: 0,
      name: '李慧贤',
      num: '185648',
      status: '空闲',
      price_tw: '35',
      price_sp: '45',
      info: '擅长：中西医结合治疗银屑病、黄褐斑、白癜风、脱发、痤疮、皮炎湿疹、荨麻疹。对病毒性疾病有着多年的...',
      avatar: ''
    }, {
      id: 1,
      name: '李慧贤',
      num: '185648',
      status: '空闲',
      price_tw: '35',
      price_sp: '45',
      info: '擅长：中西医结合治疗银屑病、黄褐斑、白癜风、脱发、痤疮、皮炎湿疹、荨麻疹。对病毒性疾病有着多年的...',
      avatar: ''
    }, {
      id: 2,
      name: '李慧贤',
      num: '185648',
      status: '空闲',
      price_tw: '35',
      price_sp: '45',
      info: '擅长：中西医结合治疗银屑病、黄褐斑、白癜风、脱发、痤疮、皮炎湿疹、荨麻疹。对病毒性疾病有着多年的...',
      avatar: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  doctorItemClick(e) {
    let item = e.currentTarget.dataset.item;
    util.navigateTo({
      url: '/pages/doctor/doctorDetail/doctorDetail'
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