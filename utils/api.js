const serverUri = "http://shanggangapi.yika.co/"
const header = {
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
}
const dubbger = true;
const request = (type, data) => new Promise((resolve, reject) => wx.request({
  url: serverUri + type + '?openid=' + wx.getStorageSync('openid'),
  data,
  header: {
    ...header,
    'AUTHORIZATIONS': wx.getStorageSync('token')
  },
  method: data ? 'POST' : 'POST',
  dataType: 'json',
  responseType: 'text',
  success: function(res) {
    if (res.data.code == "token无效") {
      wx.redirectTo({
        url: '/pages/user/user/user',
        success(){
          wx.showToast({
            title: '请授权小程序',
            icon: 'none',
            image: '',
            duration: 800,
          })
        }
      })
      reject(res)
      return
    }
    resolve(res)
  },
  fail: function(res) {
    reject(res)
  }
}))



const api = {

  // user相关
  user: {
    login: data => request(data),

  },


  // 首页相关



  // 分享相关
  share: {

  },


  //

}




module.exports = {
  dubbger,
  serverUri,
  header,
  getDoctorList: () => request('index/lb'),
  getDoctorDetail: data => request('index/ysxq', data),
  getFwInfo: data => {
    let type = ''
    if (data.type == 0) {
      //图文
      type = 'index/twwz_xq'
    } else {
      type = 'index/spwz_xq'
    }
    return request(type, data)
  },
  getCaseList: data => request('alk/alk_lb', data),
  getCaseDetail: data => request('alk/alk_xq', data),
  getClinicList: () => request('zs/zs_lb'),
  getClinicDetail: data => request('zs/zs_xq', data),
  getShare: () => request('tj/fxfx'),
  shareclum: data => request('senke.tuijian.fenxiang', data),
  auth: data => request('index/zc', data),
  getOpenId: data => request('index/login', data),
  getAddressList: () => request('dz/dz_lb'),
  addAddress: (data) => request('dz/dz_add', data),
  editAddress: (data) => request('dz/dz_edit', data),
  delAddress: data => request('dz/dz_del', data),
  getReferList: data => request('tj/tj_lb', data),
  referStore: data => request('tj/fx', data),
  payMentWz: data => request('index/jlda', data),
  getDefaultAddress: () => request('dz/dz_mr'), //获取地址
  getYdDetail: data => request('index/cfdd', data), //药单详情
  getYdOrderDetail: data => request('index/lq_yd', data), //药单订单详情
  getYdPay: data => request('index/cfzf', data), //药单支付页
  getOrderList: data => request('my/ddgl', data), //订单列表
  getOrderSuccDetail: data => request('my/dd_xq', data),
  getServiceList: data => request('my/wdwz', data), //问诊列表图文/视频
  getWzDetail: data => request('my/wzxq', data) //问诊详情
}