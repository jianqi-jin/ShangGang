const app = getApp()
Component({
  properties: {
    //props
    selectedIndex: {
      type: Number,
      value: 0
    },
    navBtnList: {
      type: Object,
      value: [
        {
          url: '/pages/home/home',
          img: '/res/icon/nav-icon-home@3x.png',
          selectedImg: '/res/icon/nav-icon-home-pre@3x.png',
          title: '首页',
          havT: true
        }, 
        {
          url: '/pages/clinicPos/clinicPos',
          img: '/res/icon/nav-icon-cli@3x.png',
          selectedImg: '/res/icon/nav-icon-cli-pre@3x.png',
          title: '诊所',
          havT: true
        },{

          url: '/pages/recommend/recommend',
          img: '/res/icon/nav-icon-rec@3x.png',
          selectedImg: '/res/icon/nav-icon-rec@3x.png',
          title: '推荐',
          bigFlag: true,
          havT: true
        }, {

          url: '/pages/caseLib/caseLib',
          img: '/res/icon/nav-icon-case@3x.png',
          selectedImg: '/res/icon/nav-icon-case-pre@3x.png',
          title: '案例库',
          havT: true
        }, {

          url: '/pages/user/user/user',
          img: '/res/icon/nav-icon-user@3x.png',
          selectedImg: '/res/icon/nav-icon-user-pre@3x.png',
          title: '我的',
          havT: true
        }
      ],
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function() {},
    navTo: function(item) {
      let index = item.currentTarget.dataset.index;
      console.log(this.data.navBtnList[index]);
      wx.redirectTo({
        url: this.data.navBtnList[index].url,
      })
    }
  },
  ready() {
    if (app.globalData.navBottom) {
      this.setData({
        navBtnList: app.globalData.navBottom
      })
    }
    app.navReady = () => {
      console.log('navBottomReLoad')
      this.setData({
        navBtnList: app.globalData.navBottom
      })
    }
  }
})