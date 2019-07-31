// pages/recommend/recommend.js
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
let allNum = 0;
let nowNum = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AllNum: 0,
    nowMun: 0,
    color: '#824C1F',
    coverHeight: "0rpx",
    codeHeight: "0rpx",
    // 顶部广告图
    advertImg: "",
    // 推荐内容
    hinge: 0,
    list: [{
        page: 1,
        data: []
      },
      {
        page: 1,
        data: []
      }
    ],
    imgurl: '',
    userName: "",
    userImg: "",
    shareInfo: ''
  },
  switchHinge(e) {
    this.setData({
      hinge: e.currentTarget.dataset.val
    })
    if (this.data.list[e.currentTarget.dataset.val].data.length == 0) {
      this.getData(e.currentTarget.dataset.val)
    }
  },

  see: (e) => {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.list[e.currentTarget.dataset.idx], // 当前显示图片的http链接
      urls: e.currentTarget.dataset.list // 需要预览的图片http链接列表
    })
  },
  //获取图片高度
  getImgWidth: function(node, fun) {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select(node).boundingClientRect(function(res) {
      fun(res.width)
      return res.width;
    }).exec()
  },
  //设置头部高度
  setCoverHeight: function(wid) {
    this.setData({
      coverHeight: wid * 0.458 + "px"
    })
  },

  // 获取数据
  getData: function(idx) {
    let this_ = this;
    let user = wx.getStorageSync('userInfo');
    let newData = this.data.list[idx];
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${api.postI}&r=senke.tuijian.index&openid=${app.globalData.openid}`, 'POST', {
      type: idx
    }).then((res) => {
      wx.setStorageSync('memberId', res.member_id)
      console.log(res.list)
      let key = `list[${idx}]`;
      newData.page++;
      newData.data = newData.data.concat(res.list);
      let userInfo = wx.getStorageSync('userInfo');
      this_.setData({
        userInfo
      })
      this_.setData({
        [key]: newData,
        userName: userInfo.nickName,
        userImg: userInfo.avatarUrl,
        advertImg: res.tj_banner
      })
    }).catch(err => {
      console.log(err)
    });
  },

  //下载资源
  download(url) {
    return new Promise(function(resolve, reject) {
      wx.showLoading({
        title: '素材下载中...',
      })
      let path;
      const downloadTask = wx.downloadFile({
        url: url,
        success: function(res) {
          console.log(res);
          wx.hideLoading()
          path = res.tempFilePath
          resolve(path);
        },
        fail: function(res) {
          console.log(res);
          wx.hideLoading()
        }
      })
      console.log(path)

      downloadTask.onProgressUpdate((res1) => {
        wx.showLoading({
          title: '素材下载中...',
          mask: true,
        })
        if (res1.progress == 100) {
          wx.hideLoading()
        }
      })


    })
  },
  // 存储
  storage(e) {
    this.setData({
      nowMum: 0
    })
    let this_ = this;
    let type = e.currentTarget.dataset.type;
    let idx = e.currentTarget.dataset.idx;
    let resourceType = e.currentTarget.dataset.form;
    let newData = this.data.list[type].data;
    let imgList = newData[idx].tp_list;

    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${api.postI}&r=senke.tuijian.save&openid=${app.globalData.openid}`, 'POST', {
      id: newData[idx].tgy_id,
      type: newData[idx].type
    }).then((res) => {
      if (resourceType == '0') {
        this_.download(newData[idx].sp).then((res) => {
          console.log(res)
          this_.shear(newData[idx].tgy)
          setTimeout(function() {
            this_.keepNetworkVideo(res)
          }, 500)

        });
      } else {
        console.log('请求回执', res)
        // 如果是一张图直接下载 否则 全下
        if (imgList.length > 1) {
          imgList.push(res.save_img)
          allNum = imgList.length;
          nowNum = 0;
          for (let i in imgList) {
            console.log(imgList[i])
            this_.download(imgList[i]).then((res) => {
              console.log(res)
              if (i == 0) {
                this_.keepNetworkImg(res, newData[idx].tgy, true)
              } else {
                this_.keepNetworkImg(res, newData[idx].tgy)
              }

            });
          }
          imgList.splice(imgList.length - 1, 1);
        } else {
          allNum = imgList.length;
          nowNum = 0;
          this_.download(res.res.img).then((res) => {
            console.log(res)
            this_.keepNetworkImg(res)
            this_.shear(newData[idx].tgy)
          });
        }

      }
      // 统计
      let key = `list[${type}].data`;
      let num = parseInt(newData[idx].xz_num);
      num++
      newData[idx].xz_num = num
      console.log(newData[idx])
      this_.setData({
        [key]: newData
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: err.toString(),
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
      })
    });
    console.log('storage End')
  },

  // 设置剪切板
  shear: function(text) {
    wx.setClipboardData({
      data: text,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 获取网络图片
  getImageInfo(url) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: resolve,
        fail: reject,
      })
    })
  },
  // 合成二维码
  synthesis(bg, code) {
    let this_ = this;
    console.log(code)
    // 获取二维码图像信息
    const avatarPromise = this.getImageInfo(code)
    // 获取背景图像信息
    const backgroundPromise = this.getImageInfo(bg)
    Promise.all([backgroundPromise, avatarPromise]).then(res => {
      const ctx = wx.createCanvasContext('shareCanvas')
      console.log(res[0].path)
      // 底图
      ctx.drawImage(res[0].path, 0, 0, 600, 900)
      // 小程序码
      const qrImgSize = 125
      ctx.drawImage(res[1].path, 40, 900 - 20 - qrImgSize, qrImgSize, qrImgSize)
      ctx.stroke()
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          width: 600,
          height: 900,
          canvasId: 'shareCanvas',
          success(res) {
            // console.log(res)
            console.log(res.tempFilePath)
            this_.keepNetworkImg(res.tempFilePath)
          }
        })
      })
    })
  },

  // 图片保存到本地
  keepNetworkImg: function(src, datasw, flag) {
    let this_ = this;
    let imgSrc = src;
    //图片保存到本地
    wx.saveImageToPhotosAlbum({
      filePath: imgSrc,
      success: function(data) {
        // util.showToast('保存成功', 'success')
        nowNum += 1;

        if (allNum <= nowNum) {

          this_.shear(datasw)
          setTimeout(function() {
            wx.showToast({
              title: '图片保存成功',
              duration: 2000,
              mask: true,
            })
          }, 500)
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          image: '',
          duration: 800,
          mask: true,
        })
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("当初用户拒绝，再次发起授权")
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
              } else {
                console.log('获取权限失败，给出不给权限就无法正常使用的提示')
              }
            }
          })
        }
      },
      complete(res) {
        console.log(res);
      }
    })
  },
  // 视频保存到本地
  keepNetworkVideo: function(src) {
    let this_ = this;
    let imgSrc = src;
    //图片保存到本地
    wx.saveVideoToPhotosAlbum({
      filePath: imgSrc,
      success: function(data) {
        // util.showToast('保存成功', 'success')
        wx.showToast({
          title: '视频保存成功',
          icon: '',
          image: '',
          duration: 2000,
          mask: true
        })
      },
      fail: function(err) {
        console.log(err);
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("当初用户拒绝，再次发起授权")
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                wx.showToast({
                  title: '获取权限成功,重新点击以保存',
                  icon: '',
                  image: '',
                  duration: 1000,
                  mask: true
                })
              } else {
                console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                wx.showToast({
                  title: '获取权限失败',
                  icon: '',
                  image: '',
                  duration: 1000,
                  mask: true
                })
              }
            }
          })
        }
      },
      complete(res) {
        console.log(res);
      }
    })
  },

  setShare() { //
    let this_ = this;
    api.getShare(app.globalData.openid).then(res => {
      console.log(res)
      this_.setData({
        shareInfo: res.data,
      })
    })
    // util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${util.posId}&r=senke.tuijian.get_share&openid=${wx.getStorageSync('openid')}`, 'POST', {}).then((res) => { 
    //   console.log(res)
    //   res.fx.title = '森客啤酒';
    //   this_.setData({
    //     shareInfo: res.fx,
    //   })

    // }).catch(err => {
    //   console.log(err)
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    this.getData(this.data.hinge)
    let userName = wx.getStorageSync('userName');
    let userImg = wx.getStorageSync('userImg');
    if (!userName || !userImg) {
      wx.getUserInfo({
        withCredentials: true,
        lang: '',
        success: (res) => {
          console.log(res)
          userName = res.userInfo.nickName
          userImg = res.userInfo.avatarUrl
          this.setData({
            userName: userName,
            userImg: userImg
          })
        },
      })
    } else {
      this.setData({
        userName: userName,
        userImg: userImg
      })
    }
    console.log('SHARE')
    this.setShare()
    this.setData({
      color: app.globalData.themeColor //app.globalData.color
    })
    wx.setNavigationBarTitle({
      title: '推荐有奖'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getImgWidth(".headerImg", this.setCoverHeight)
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
    // this.getData(this.data.hinge)
  },

  statistics(id) {
    util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${api.postI}&r=yktk.yq.fx&openid=${wx.getStorageSync('openid')}`, 'POST', {
      id: id
    }).then((res) => {
      console.log(res.res.img)
      let obj = {
        tgy: res.res.tgy,
        img: res.res.img,
        url: `/pages/accredit/accredit?uid=${res.res.uid}&store_id=${res.res.store_id}`
      }
      return {
        title: obj.tgy,
        imageUrl: obj.img,
        path: obj.url
      }

    }).catch(err => {
      console.log(err)
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    console.log('share')
    let this_ = this;
    if (e.target) {
      let type = e.target.dataset.type;
      let idx = e.target.dataset.idx;
      let newData = this.data.list[type].data;
      let id = newData[idx].tgy_id;
      util.request(util.apiUrl + `app/ewei_shopv2_api.php?i=${api.postI}&r=senke.tuijian.fenxiang&openid=${app.globalData.openid}`, 'POST', {
        id: id,
        type: 1
      }).then((res) => {
        console.log(res)
        console.log('asdasdadsassssssssssssss')
        // 统计
        let key = `list[${type}].data`;
        newData[idx].num = res.res.num
        // newData[idx].ar.push({ avatar: res.res.img })
        console.log(newData[idx])
        this_.setData({
          [key]: newData
        })

      }).catch(err => {
        console.log(err)
      });
    }
    return {
      title: this.data.shareInfo.title,
      imageUrl: this.data.shareInfo.icon,
      path: `/pages/home/home?memberid=${wx.getStorageSync('memberId')}`
    }
  }
})