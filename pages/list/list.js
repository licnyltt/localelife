// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: -1,
    currentPage: 0,
    pageSize: 10,
    hasMore: true
  },

  loadingListData: function() {
    let { id, currentPage, pageSize, list } = this.data
    currentPage += 1
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `https://locally.uieee.com/categories/${id}/shops`, //仅为示例，并非真实的接口地址
      data: {
        _page: currentPage,
        _limit: pageSize
      },
      success: res => {
        console.log(res)
        this.setData({
          list: [...list, ...res.data],
          currentPage,
          hasMore: currentPage < Math.ceil(res.header['x-total-count'] / pageSize)
        })
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  },

  fetchTitleData () {
    wx.request({
      url: `https://locally.uieee.com/categories/${this.data.id}`,
      success: res => {
        console.log('lll', res)
        wx.setNavigationBarTitle({
          title: res.data.name
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { currentPage } = this.data
    this.setData({
      id: options.id
    })
    this.loadingListData()
    this.fetchTitleData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.loadingListData()
    }
  }
})