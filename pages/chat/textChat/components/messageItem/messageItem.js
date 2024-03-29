// pages/chat/textChat/components/messageItem/messageItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msgInfo: {
      type: {
        type: Number,
        defalut: 0
      }, //0自己 1别人 -1系统
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    previewImg(e) {
      let {
        img
      } = e.currentTarget.dataset;
      wx.previewImage({
        urls: [img],
      })
    },
    clickMedOrder(e) {
      this.triggerEvent('onAction', {
        type: 'orderClick',
        data: e.currentTarget.dataset.item
      })
    }
  }
})