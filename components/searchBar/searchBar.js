// components/searchBar/searchBar.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAction() {
      this.triggerEvent('onAction', {
        type: 'click'
      })
    },
    onChange(e) {
      this.triggerEvent('onAction', {
        type: 'change',
        data: e.detail.value
      })
    }
  }
})