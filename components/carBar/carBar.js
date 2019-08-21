// components/cardBar/carBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showFlag: false,
    goodInfo: {
      navFlag: false,
      type: 'line'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      let type = e.currentTarget.dataset.type
      this.triggerEvent('onAction', {
        type
      })
    },
    close() {
      this.setData({
        showFlag: false
      })
    },
    show() {
      this.setData({
        showFlag: true
      })
    }
  }
})