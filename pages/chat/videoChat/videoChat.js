// pages/chat/videoChat/videoChat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    timer: 0, //timer
    duration: 0, //通话时长int
    timeStr: '', //通话时间字符串
    cameraFlag: true,
    cameraFront: true, //镜头朝向
    mute: false //静音
  },
  stateChange(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  syncDone(obj) {
    console.log('同步完成')
    // this.initLivePusher()
    console.log(obj)
    this.setData({
      pushSrc: obj.userlist[0].url
    })

    // setTimeout(() => {

    //   this.livePusherContext.start({
    //     success: () => {
    //       wx.showToast({
    //         title: '开始推流',
    //         icon: 'none',
    //         image: '',
    //         duration: 800,
    //         mask: true,
    //       })
    //     },
    //     fail: () => {

    //       wx.showToast({
    //         title: '推流失败',
    //         icon: 'none',
    //         image: '',
    //         duration: 800,
    //         mask: true,
    //       })
    //     }
    //   })
    // }, 500)
  },
  start() {
    this.livePusherContext.start()
  },
  callRejected(obj) {
    this._audioReject()
    setTimeout(() => {
      wx.navigateBack({
        delta: 1,
      })
    }, 500)
  },
  onClientLeave(obj) {
    console.log('由用户离开')
    this.hangupVideo()
  },
  clientJoin(obj) {
    console.log('由用户加入')
    console.log(obj.url)
    this.setData({
      playSrc: obj.url
    })
    // this.setData({
    //   userList: this.data.userlist.push(obj)
    // })
  },


  onReady() {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = false
    this.innerAudioContext.loop = true
    this.innerAudioContext.src = '/res/mp3/calling.mp3'
    this.innerAudioContext.play()
    this.innerAudioContext.onPlay(() => {
      console.log('asd')
    })
  },
  start() {
    this.livePusherContext.start();
  },
  onLoad: function(options) {
    let that = this;
    this.setData({
      docAvatar: wx.getStorageSync('docAvatar'),
      docName: wx.getStorageSync('docName')
    })
    getApp().syncDone = this.syncDone
    getApp().clientJoin = this.clientJoin
    getApp().onHangUp = this.onHangUp
    getApp().onClientLeave = this.onClientLeave


    getApp().callAccepted = obj => {
      clearTimeout(this.data.backTimer) //清除挂断定时器
      this.innerAudioContext.pause()
      this.setData({
        cameraFlag: false
      })
      console.log('用户接通了')
      console.log(obj)
      //开启视频通话
      getApp().netCall.startRtc({
          mode: 0
        })
        .then(obj => {
          console.log('开启视频通话成功')
          this.initLivePusher()
          this.setData({
            timer: setInterval(() => {
              this.timeAdd()
            }, 1000)
          })
          wx.showToast({
            title: '开启视频通话成功',
            duration: 800,
          })


        })
        .catch(e => {
          wx.showToast({
            title: e.toString(),
            icon: '',
            image: '',
            duration: 800,
          })
        })
    }

    this.callVideo()
    this.setData({
      backTimer: setTimeout(() => {
        console.log('挂断')
        wx.showToast({
          title: '无人接听',
          icon: 'none',
          duration: 800,
          success: (res) => {
            this.hangupVideo()
          },
        })
      }, 30e3)
    })
  },
  initLivePusher() {
    this.livePusherContext = wx.createLivePusherContext('pusher')
    this.livePlayerContext = wx.createLivePlayerContext('livePlayer')
  },
  timeAdd() {
    this.setData({
      duration: this.data.duration + 1,
      timeStr: Math.floor((this.data.duration / 60)) + ':' + (this.data.duration % 60)
    })
    console.log(this.data.duration)
  },
  callVideo() {
    getApp().netCall.call({
        type: 2,
        callee: wx.getStorageSync('docIm')
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  },
  onHangUp() {
    this._audioHangUp()
    setTimeout(() => {
      wx.navigateBack({
        delta: 1,
      })
    }, 500)
  },
  _audioHangUp() { //音频挂断
    this.innerAudioContext.loop = false;
    this.innerAudioContext.pause()
  },
  _audioReject() { //音频对方拒绝
    this.innerAudioContext.loop = false;
    this.innerAudioContext.pause()
  },
  _audioAccept() { //音频对方接听
    this.innerAudioContext.loop = false;
    this.innerAudioContext.pause()
  },
  hangupVideo() {
    this._audioHangUp()
    getApp().netCall.hangup();
    wx.navigateBack({
      delta: 1,
    })

  },
  btnClick(e) {
    let {
      index
    } = e.currentTarget.dataset;
    switch (index) {
      case 0:
        {

          if (this.data.mute) {
            //切换恢复
            this.livePlayerContext.resume()
          } else {
            this.livePlayerContext.mute()
          }
          this.setData({
            mute: !this.data.mute
          })
          break;
        }
      case 1:
        {
          break;
        }
      case 2:
        {
          // this.livePusherContext['device-position'] = this.livePusherContext['device-position'] == 'front' ? "back" : "front";
          this.setData({
            cameraFront: !this.data.cameraFront
          })
          this.livePusherContext.switchCamera()
          break;
        }
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
    this.hangupVideo()
    clearInterval(this.data.timer);
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