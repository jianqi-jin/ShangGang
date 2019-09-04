// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    closeFlag: {
      value: true,
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('onAction', {
        type: 'close'
      })
    }
  }
})