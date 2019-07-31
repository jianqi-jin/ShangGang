const serverUri = ""
const header = {}
const request = data => new Promise((resolve, reject) => wx.request({
  url: '',
  data,
  header,
  method: data ? 'POST' : 'GET',
  dataType: 'json',
  responseType: 'text',
  success: function(res) {
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
  api
}