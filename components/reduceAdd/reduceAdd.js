// components/reduceAdd/reduceAdd.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    number: {
      value: 0,
      type: Number
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
    onAction(e) {
      let type = e.currentTarget.dataset.type;
      if (type == 'add' || this.data.number > 0) {
        this.triggerEvent('onAction', {
          type
        })
      }
    }
  },
})