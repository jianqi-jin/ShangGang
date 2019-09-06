// components/ydList/ydList.js
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ydList: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusList: ['[未支付]', '', '', '', ''],
    btnList: ['去支付', '', '', '', '处方已过期']
  },

  /**
   * 组件的方法列表
   */
  methods: {

    itemClick(e) {
      let item = e.currentTarget.dataset.item;
      let uri = 'ydDetail/ydDetail?orderId=' + item.order_id + '&order_pid=' + item.sj_pid + '&order_cftype_status=' + item.order_cftype_status
      util.navigateTo({
        url: '/pages/user/service/' + uri
      })
    },
  }
})