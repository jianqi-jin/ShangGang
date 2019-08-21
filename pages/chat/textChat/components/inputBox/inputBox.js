// pages/chat/textChat/components/inputBox/inputBox.js
const {
  userCancel
} = require('../../../../../utils/util.js')
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
    chatInputBottom: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChooseImgClick() {
      wx.chooseImage({
        count: 1,
        success: res => {
          console.log(res)
        },
        fail: res => {
          userCancel();
        }
      })
    },
    heightChange(e) {
      console.log(e)
    },
    onSendClick() {
      this.triggerEvent('onAction', {
        type: 'send',
        data: {
          msg: ''
        }
      })
    },
    onFocus(e) {
      this.setData({
        chatInputBottom: e.detail.height
      })
    },
    onBlur() {
      this.setData({
        chatInputBottom: 0
      })
    }
  }
})