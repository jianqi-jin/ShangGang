// pages/chat/textChat/textChat.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0, //滚动到底部
    mesInfoList: [],
    openid: wx.getStorageSync('openid').toLowerCase(),
    avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
    docIm: '',
    scrollAnimation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onScrollToTop() {
    this.getHistoryMsgs(1)
  },
  getHistoryMsgs(type) { //type = 0 时 为首次加载，滑动到底部  type = 1 时为上拉加载
    wx.showLoading({
      title: '加载中...',
    })
    console.log('getHistory')
    let option = {} //请求设置信息
    if (type == 1) {
      this.setData({
        scrollAnimation: false
      })
      //上拉加载，判断最早一条的时间
      let mesInfoList = [].concat(this.data.mesInfoList);
      let toView = 'msg' + (mesInfoList[0].id || mesInfoList[1].id)
      try {
        let lastTime = this.data.mesInfoList[0].time; //最早时间
        option = {
          scene: 'p2p',
          to: this.data.docIm,
          asc: true,
          endTime: lastTime,
          limit: 10,
          done: (err, res) => {
            if (res.msgs.length < 1) {
              wx.showToast({
                title: '没有更多消息了哟',
                icon: 'none',
                image: '',
                duration: 800,
              })
              return
            }
            let _tempMesList = [] //临时消息列表
            let osTimeMsg = { //系统时间消息
              id: 'data' + res.msgs[0].time,
              time: res.msgs[0].time,
              msg: new Date(parseInt(res.msgs[0].time)).toLocaleString().replace(/:\d{1,2}$/, ' '),
              type: '-1'
            }
            this.appendHisMsg([osTimeMsg, ...res.msgs])
            wx.hideLoading()
            this.setData({
              scrollAnimation: true
            })
          }
        }
      } catch (e) {
        return
      }
    } else {
      option = {
        scene: 'p2p',
        to: this.data.docIm,
        asc: true,
        limit: 10,
        done: (err, res) => {
          res.msgs.map((val, index) => {
            if (index == 0) {
              let osTimeMsg = { //系统时间消息
                ...val,
                msg: new Date(parseInt(val.time)).toLocaleString().replace(/:\d{1,2}$/, ' '),
                type: '-1'
              }
              this.appendMsg(osTimeMsg, -1)
            }
            this.appendMsg(val)
          })
          wx.hideLoading()
        }
      }
    }
    //获取聊天
    getApp().nim.getHistoryMsgs(option)
  },
  onLoad: function(options) {
    this.setData({
      docAvatar: wx.getStorageSync('docAvatar'),
      docIm: wx.getStorageSync('docIm')
    })
    getApp().onmsg = (msg) => {
      this.onmsg(msg)
    }
    this.getHistoryMsgs()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(e) {},
  appendMsg(msg, num, toView) { //msg为msg结构体 num为当前位置  不存在为新数据  存在则替换数据（用于显示·发送中·）  -1为上拉加载    toView为view id
    //封装msg对象
    //判断是否为系统消息   type== -1
    if (msg.type == '-1') {
      this.setData({
        mesInfoList: [msg, ...this.data.mesInfoList]
      })

      //滚动回去
      this.setData({
        toView: toView
      })
      return
    }
    let msgType = msg.from.toLowerCase() == this.data.openid; //true自己  
    let msgObj = {}
    if (msg.type == 'text') {
      let custom = ''
      try {
        custom = JSON.parse(msg.custom)
      } catch (e) {
        custom = ''
      }
      msgObj = {
        id: msg.idServer,
        type: !msgType ? 1 : 0, //0自己
        msg: msg.text,
        avatar: !msgType ? this.data.docAvatar : this.data.avatarUrl,
        time: msg.time,
        msgType: 'text',
        custom
      }

    } else {
      let {
        w,
        h
      } = msg.file
      if (w > 200 || h > 200) {
        let pro = 0;
        if (w > 200) {
          pro = 200 / w
          h = h * pro
          w = 200
        } else {
          pro = 200 / h
          w = w * pro
          h = 200
        }
      }
      // console.log(w, h)
      msgObj = {
        id: msg.idServer,
        type: !msgType ? 1 : 0,
        msg: msg.text,
        avatar: !msgType ? this.data.docAvatar : this.data.avatarUrl,
        msgType: 'image',
        imgSrc: msg.file.url,
        time: msg.time,
        w,
        h
      }
    }

    //将msg加入
    if (num) {
      if (num == -1) {
        this.setData({
          mesInfoList: [
            msgObj,
            ...this.data.mesInfoList
          ]
        })
      } else {
        this.setData({
          mesInfoList: (this.data.mesInfoList[num] = msgObj, this.data.mesInfoList)
        })
      }
    } else {
      this.setData({
        mesInfoList: [
          ...this.data.mesInfoList,
          msgObj
        ]
      })
    }

    if (num != -1) {
      this.scrollToBottom()
    } else if (toView) {
      //滚动回去
      this.setData({
        toView: toView
      })
    }
  },
  appendMsg(msg, num, toView) { //msg为msg结构体 num为当前位置  不存在为新数据  存在则替换数据（用于显示·发送中·）  -1为上拉加载    toView为view id
    //封装msg对象
    //判断是否为系统消息   type== -1
    if (msg.type == '-1') {
      this.setData({
        mesInfoList: [msg, ...this.data.mesInfoList]
      })

      //滚动回去
      this.setData({
        toView: toView
      })
      return
    }
    let msgType = msg.from.toLowerCase() == this.data.openid; //true自己  
    let msgObj = {}
    if (msg.type == 'text') {
      let custom = ''
      try {
        custom = JSON.parse(msg.custom)
      } catch (e) {
        custom = ''
      }
      msgObj = {
        id: msg.idServer,
        type: !msgType ? 1 : 0, //0自己
        msg: msg.text,
        avatar: !msgType ? this.data.docAvatar : this.data.avatarUrl,
        time: msg.time,
        msgType: 'text',
        custom
      }

    } else {
      let {
        w,
        h
      } = msg.file
      if (w > 200 || h > 200) {
        let pro = 0;
        if (w > 200) {
          pro = 200 / w
          h = h * pro
          w = 200
        } else {
          pro = 200 / h
          w = w * pro
          h = 200
        }
      }
      // console.log(w, h)
      msgObj = {
        id: msg.idServer,
        type: !msgType ? 1 : 0,
        msg: msg.text,
        avatar: !msgType ? this.data.docAvatar : this.data.avatarUrl,
        msgType: 'image',
        imgSrc: msg.file.url,
        time: msg.time,
        w,
        h
      }
    }

    //将msg加入
    if (num) {
      if (num == -1) {
        this.setData({
          mesInfoList: [
            msgObj,
            ...this.data.mesInfoList
          ]
        })
      } else {
        this.setData({
          mesInfoList: (this.data.mesInfoList[num] = msgObj, this.data.mesInfoList)
        })
      }
    } else {
      this.setData({
        mesInfoList: [
          ...this.data.mesInfoList,
          msgObj
        ]
      })
    }

    if (num != -1) {
      this.scrollToBottom()
    } else if (toView) {
      //滚动回去
      this.setData({
        toView: toView
      })
    }
  },
  _changeMsg(msg) { //转换msg结构
    if (msg.type == '-1') {
      return msg
    }
    let msgType = msg.from.toLowerCase() == this.data.openid; //true自己  
    let msgObj = {}
    if (msg.type == 'text') {
      let custom = ''
      try {
        custom = JSON.parse(msg.custom)
      } catch (e) {
        custom = ''
      }
      msgObj = {
        id: msg.idServer,
        type: !msgType ? 1 : 0, //0自己
        msg: msg.text,
        avatar: !msgType ? this.data.docAvatar : this.data.avatarUrl,
        time: msg.time,
        msgType: 'text',
        custom
      }

    } else {
      let {
        w,
        h
      } = msg.file
      if (w > 200 || h > 200) {
        let pro = 0;
        if (w > 200) {
          pro = 200 / w
          h = h * pro
          w = 200
        } else {
          pro = 200 / h
          w = w * pro
          h = 200
        }
      }
      // console.log(w, h)
      msgObj = {
        id: msg.idServer,
        type: !msgType ? 1 : 0,
        msg: msg.text,
        avatar: !msgType ? this.data.docAvatar : this.data.avatarUrl,
        msgType: 'image',
        imgSrc: msg.file.url,
        time: msg.time,
        w,
        h
      }
    }
    return msgObj
  },
  appendHisMsg(msgList) { //msg为msg结构体 num为当前位置  不存在为新数据  存在则替换数据（用于显示·发送中·）  -1为上拉加载    toView为view id
    //封装msg对象
    //判断是否为系统消息   type== -1
    let _tempMsgList = []
    let toView = 'msg' + this.data.mesInfoList[0].id
    msgList.map((val, index) => {
      _tempMsgList.push(this._changeMsg(val))
    })
    this.setData({
      mesInfoList: [..._tempMsgList, ...this.data.mesInfoList],
      toView
    })
  },
  scrollToTop() {
    this.setData({
      scrollTop: 0
    })
  },
  //修改消息的status
  changeStatus(idServer, stauts) {
    let {
      mesInfoList
    } = this.data
    mesInfoList = mesInfoList.map(val => {
      if (val.idServer == idServer) {
        val.status = status
      }
      return val
    })
    this.setData({
      mesInfoList
    })
  },
  onmsg(msg, num) {
    console.log(msg)
    //封装msg对象
    if (msg.from != this.data.docIm) {
      //非本页面聊天,丢弃
      return
    }
    this.appendMsg(msg, num)
    // if (msg.type == 'text') {
    //   let msgObj = {
    //     id: 0,
    //     type: !msgType ? 1 : 0,
    //     msg: msg.text,
    //     avatar: !msgType ? this.data.docAvatar : wx.getStorageSync('userInfo').avatarUrl,
    //     msgType: 'text',
    //     custom: {
    //       id: 96,
    //       docName: '李志远',
    //       name: '温宿',
    //       time: '2019-8-16'
    //     }
    //   }
    //   console.log([
    //     ...this.data.mesInfoList,
    //     msgObj
    //   ])
    //   //将msg加入
    //   this.setData({
    //     mesInfoList: [
    //       ...this.data.mesInfoList,
    //       msgObj
    //     ]
    //   })
    //   this.scrollToBottom()
    // } else {
    //   let {
    //     w,
    //     h
    //   } = msg.file
    //   if (w > 200 || h > 200) {
    //     let pro = 0;
    //     if (w > 200) {
    //       pro = 200 / w
    //       h = h * pro
    //       w = 200
    //     } else {
    //       pro = 200 / h
    //       w = w * pro
    //       h = 200
    //     }
    //   }
    //   console.log(w, h)
    //   this.setData({
    //     mesInfoList: [...this.data.mesInfoList, {
    //       id: 0,
    //       type: !msgType ? 1 : 0,
    //       msg: msg.text,
    //       avatar: !msgType ? this.data.docAvatar : wx.getStorageSync('userInfo').avatarUrl,
    //       msgType: 'image',
    //       imgSrc: msg.file.url,
    //       w,
    //       h
    //     }]
    //   })
    // }

  },
  onMsgAction(e) {
    let item = e.detail;
    console.log(item)
    if (item.type == 'orderClick') {
      //此处是药单的解析
      wx.navigateTo({
        url: '/pages/user/service/ydDetail/ydDetail?orderId=' + item.data.id + '&order_cftype_status=1'
      })
    }
  },
  onAction(e) {
    let item = e.detail
    if (item.type == 'send') {
      if (item.data.msg == '') {
        wx.showToast({
          title: '请输入发送的内容',
          icon: 'none',
          duration: 800,
        })
        return
      }
      let {
        mesInfoList
      } = this.data
      let num = mesInfoList.length;
      this.setData({
        mesInfoList: [...mesInfoList,
          {
            id: '',
            msgType: 'text',
            msg: '正在发送',
            type: 0,
            avatar: this.data.avatarUrl,
          }
        ]
      })
      const msg = getApp().nim.sendText({
        scene: 'p2p',
        to: this.data.docIm,
        text: item.data.msg,
        custom: {
          avatar: wx.getStorageSync('userInfo').avatarUrl
        },
        done: (err, res) => {
          console.log(err)
          this.appendMsg(res, num)
          // console.log(err, res)
          // //封装msgObj
          // let msgObj = {
          //   id: 0,
          //   type: res.flow == 'in' ? 1 : 0,
          //   msg: res.text,
          //   msgType: 'text'
          // }
          // this.setData({
          //   mesInfoList: [...this.data.mesInfoList, msgObj]
          // })
          // this.scrollToBottom()
        }
      })
      console.log('正在发送' + msg);

    }

    if (item.type == 'chooseImg') {
      wx.chooseImage({
        count: 1,
        success: res => {
          console.log(res)
          let num = this.data.mesInfoList.length;
          this.setData({
            mesInfoList: [...this.data.mesInfoList, {
              id: '',
              msgType: 'text',
              msg: '正在发送',
              type: 0,
              avatar: this.data.avatarUrl,
            }]
          })
          this.scrollToBottom()

          getApp().nim.sendFile({
            scene: 'p2p',
            to: this.data.docIm,
            type: 'image',
            wxFilePath: res.tempFilePaths[0],
            done: (err, result) => {
              this.appendMsg(result, num)

            }
          })
        },
        fail: res => {
          userCancel();
        }
      })
    }
  },
  scrollToBottom() {
    this.setData({
      scrollTop: this.data.mesInfoList.length * 100
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      docIm: wx.getStorageSync('docIm')
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