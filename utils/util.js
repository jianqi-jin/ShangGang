const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const navigateTo = ({
  url
}) => {
  wx.showLoading({
    title: '跳转中...',
  })
  wx.navigateTo({
    url: url,
    success: function(res) {
      wx.hideLoading()
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

const userCancel = () => wx.showToast({
  title: '用户取消',
  icon: 'none',
  image: '',
  duration: 800,
  mask: true
})

module.exports = {
  formatTime: formatTime,
  navigateTo,
  userCancel
}