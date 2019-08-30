//app.js
const {
  dubbger,
  getOpenId
} = require('./utils/api.js')

const NIM = require('./utils/NIM_Web_NIM_weixin_v6.8.0.js')
const NetcallWeixin = require('./utils/NIM_Web_Netcall_weixin_v6.8.0')
App({

  //IM函数

  onTest() {
    console.log('onTest')
  },
  onclose() {

  },
  IMInit() {
    // 初始化IM聊天SDK
    console.log(this.globalData.nimData)
    this.nim = NIM.getInstance({
      ...this.globalData.nimData,
      onconnect: (res) => {
        console.log(res)

        // 初始化IM视频SDK Start
        this.netCall = NetcallWeixin.getInstance({
          nim: this.nim
        })
        this.netCall.on('error', obj => {
          console.log(obj)
        })
        this.netCall.on('hangup', obj => {
          console.log(obj)
          this.onHangUp(obj)
        })
        this.netCall.on('syncDone', obj => {
          console.log('syncDown')
          // console.log(obj)
          this.syncDone(obj)
        })
        this.netCall.on('callAccepted', obj => {
          console.log('用户接受')
          this.callAccepted(obj)
        })
        this.netCall.on('clientJoin', (obj) => {
          console.log('有人加入')
          this.clientJoin(obj)
        })
        this.netCall.on('callRejected', (obj) => {
          console.log('用户拒绝')
          this.callRejected(obj)
        })
        this.netCall.on('clientLeave', (obj) => {
          console.log('有用户离开', obj)
          this.onClientLeave(obj)
        })
        // 初始化IM视频SDK End


      },
      onmsg: (msg) => {

        this.onmsg ? this.onmsg(msg) : console.log(msg)
      },
      ondisconnect: obj => {
        console.log(obj);
        wx.showModal({
          title: '连接丢失，请重新连接',
          content: '请点击·确认·进行重新连接~',
          showCancel: true,
          success: (res) => {
            this._login()
          },
          fail: (res) => {
            this._login()
          }
        })
        wx.showToast({
          title: '',
          icon: 'none',
          duration: 800,
          mask: true,
        })
      }
    })
    // 初始化IM聊天SDK



  },

  //IM函数


  onLaunch: function() {
    NIM.use(NetcallWeixin);
    let _log = console.log
    var getStackTrace = function() {
      var obj = {};
      Error.captureStackTrace(obj, getStackTrace);
      return obj.stack;
    };
    // console.log = (data) => {
    //   if (!dubbger) {
    //     return
    //   }
    //data = typeof data == "object" ? JSON.stringify(data):data;
    // var stack = getStackTrace() || ""
    // var matchResult = stack.split('at') || []
    // let paramsStart = ['%c------dubbger log Start------\n', 'color:red;']
    // let paramsEnd = ['%c------log End------\n', 'color:red;']
    // _log('dubbger ', matchResult[2], data)
    // }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取theme
    this._login()


  },
  _login() { //封装login
    wx.login({
      success: (res) => {
        console.log(res)
        getOpenId({
          code: res.code
        }).then(res => {
          if (res.data.status == 0) {
            let data = res.data.code;
            wx.setStorageSync('openid', data.openid)
            wx.setStorageSync('accid', data.accid)
            this.globalData.nimData.account = data.accid
            this.globalData.nimData.token = data.token
            wx.setStorageSync('session_key', data.session_key)
            this.IMInit()
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    nimData: {
      debug: false,
      appKey: '9546d632068f1b9a3ec5593c19e402d1',
      account: 'zhuxindi',
      token: 'a073136132889e0f904aa92cf5722ce6',
    }
  }
})