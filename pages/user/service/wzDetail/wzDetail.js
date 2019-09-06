// pages/user/service/wzDetail/wzDetail.js
const util = require('../../../../utils/util.js')
const {
  getWzDetail,
  getAccid
} = require('../../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [{
      iconImg: '/res/icon/icon-yyjl@3x.png',
      title: '用药建议记录',
      iconArr: '/res/icon/doc-icon-left@3x.png',
      url: '/pages/user/service/wzDetail/ydList/ydList'
    }, {
      iconImg: '/res/icon/icon-dhjl@3x.png',
      title: '问诊对话记录',
      iconArr: '/res/icon/doc-icon-left@3x.png',
      url: '/pages/chat/textChat/textChat'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ...options
    })
    wx.setStorageSync('order_pid', this.data.order_id)
    this.getWzDetail()
  },
  getWzDetail() {
    getWzDetail({
      order_id: this.data.order_id
    }).then(res => {
      console.log(res)
      this.setData({
        ...this.data,
        ...res.data.code
      })
      if (res.data.code.order_type == 1) { //视频
        this.setData({
          'infoList[1].title': '视频对话记录',
          'infoList[1].url': '/pages/user/service/wzDetail/videoList/videoList?docId=' + this.data.doc_id
        })
      }
      getAccid({
        doc_id: this.data.doc_id
      }).then(res => {
        this.setData({
          ...res.data.code
        })
        wx.setStorageSync('docIm', res.data.code.doc_im)
        wx.setStorageSync('docAvatar', this.data.doc_avatar)
        wx.setStorageSync('docName', this.data.doc_name)
      })
    })
  },
  infoItemClick(e) {
    let item = e.currentTarget.dataset.item;
    let url = item.url;
    util.navigateTo({
      url: url + '?orderId=' + this.data.order_id
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