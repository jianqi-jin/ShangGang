// components/orderDetailMap/orderDetailMap.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    markers: [{
      iconPath: "/res/icon/select-cart@3x.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      callout: {
        content: '等待支付 \n ',
        display: 'ALWAYS',
        borderRadius: 5,
        padding: 5,
        fontSize: 17
      },
      label: {
        content: '12:33',
        anchorX: -15,
        anchorY: -85,
        color: "#999999"
      }
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})