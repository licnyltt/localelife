Page({
  data: {
    id: -1
  },
  onLoad ({ id }) {
    this.setData({
      id,
      detailData: {}
    })
    this.fetchData()
  },
  fetchData () {
    const { id } = this.data
    wx.request({
      url: `https://locally.uieee.com/shops/${id}`,
      success: res => {
        console.log(res)
        this.setData({
          detailData: res.data
        })
      }
    })
  },
  previewImage (e) {
    console.log('e', e)
    let { currentTarget: { dataset: { current, urls } } } = e
    let currentReplace = current.replace('w.h', '1000.1000')
    let urlsReplsce = urls.map(item => {
      return item.replace('w.h', '1000.1000')
    })
    wx.previewImage({
      current: currentReplace, // 当前显示图片的http链接
      urls: urlsReplsce // 需要预览的图片http链接列表
    })
  }
})
