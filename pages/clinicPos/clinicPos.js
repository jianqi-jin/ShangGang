// pages/clinicPos/clinicPos.js
const { getClinicList } = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getClinicList().then(res => {
      console.log(res)
      if (res.data.status == 0) {
        let data = res.data.code;
        // data.list = data.list.map(val => {
        //   val.distance = this.getDistance(val).then(res => {

        //   })
        //   return val
        // })
        this.setData({
          clinicList: [...data.list]
        })
        this.clcDistance()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  clcDistance() {
    // getLocation({
    //   success: (res) => {

    //   }
    // })
    this.setData({
      clinicList: {
        ...this.data.clinicList.map(val => {
          //通过经纬度计算距离
          val.distance = '1.3'
          return val
        })
      }
    })
  },
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