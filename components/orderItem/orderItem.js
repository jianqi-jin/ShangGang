// components/orderItem/orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderInfo: {
      value: {},
      type: Object
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
    onTap(e) {
      let item = e.currentTarget.item;
      this.triggerEvent('onAction', {
        type: 'itemTap',
        item
      })
    },
    onBtnClick(e) {
      let item = e.currentTarget.item;
      this.triggerEvent('onAction', {
        type: 'btnClick',
        item
      })
    }
  }
})