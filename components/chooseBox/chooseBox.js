// components/chooseBox/chooseBox.js
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
    info: {
      title: '01桌',
      iconArr: '/res/icon/pj-ok@3x.png',
      iccArrStyle: 'width:40rpx;height:40rpx'
    },
    infoLeftList: [{
      title: 'A区',
      titleStyle: 'margin-left:50rpx;'
    }, {
      title: 'B区',
      titleStyle: 'margin-left:50rpx',
      style: 'background:#f5f5f5;'
    }, {
      title: 'C区',
      titleStyle: 'margin-left:50rpx',
      style: 'background:#f5f5f5;'
    }, {
      title: 'D区',
      titleStyle: 'margin-left:50rpx',
      style: 'background:#f5f5f5;'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    move() {},
    onAction(e) {
      let type = e.currentTarget.dataset.type
      this.triggerEvent('onAction', {
        type
      })
    }
  },
})