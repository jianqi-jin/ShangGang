// components/goodItem/goodItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodInfo: {
      type: Object,
      value: {
        type: "line", //或者box
        navFlag: true
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    number: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    move(){

    },
    navToDetail(){
      if(goodInfo.nav == true){
        wx.navigateTo({
          url: '/pages/good/goodDetail/goodDetail'
        })
      }
    },
    onNumChange(e) {
      let type = e.detail.type;
      if (type == 'add') {

        this.setData({
          number: this.data.number + 1
        })
      } else {

        this.setData({
          number: this.data.number - 1
        })
      }
    }
  }
})