// components/themeView/themeView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    style:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready(){
    console.log('ready')
    console.log(this.properties.type)
    this.setData({
      style: ''//getApp().globalData[this.properties.type]
    })
  }
})
