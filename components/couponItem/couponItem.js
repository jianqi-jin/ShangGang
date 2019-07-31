// components/couponItem/couponItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponInfo: {
      value: [
        {
          title: '美食红包',
          price: '5.6',
          less: '28',
          validTime: '2019.08.31'
        }
      ],
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
    onTap(e){
      let type = e.currentTarget.dataset.type;
      let item = e.currentTarget.dataset.item;
      this.triggerEvent(type, item)
    }
  }
})
