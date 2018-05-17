// recycle/pages/buy/buy.js
import http from '../../util/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = 1
    var my =1
    http.post('goods_list', { page: page,my:my}).then(data => {
      console.log(data)
      that.setData({
        goods_list: data.list,
        total: data.total
      })
    })
    var title = wx.getStorageSync('title')
    wx.setNavigationBarTitle({
      title: title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  detail: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  fabu: function () {
    wx.navigateTo({
      url: '../recycl/recycl',
    })
  },
  keyword: function (e) {
    console.log(e)
    this.setData({
      keyword: e.detail.value
    })
  },
  onReachBottom: function () {
    var that = this
    var my = 1
    var page = this.data.page++;
    var total = this.data.total;
    var keyword = this.data.keyword
    var count = Math.ceil(total / 10);
    if (page > count) {
      wx.showToast({
        title: '加载完毕',
        icon: 'success',
        duration: 1000
      })
      return
    }
    http.post('goods_list', { page: page, my:my }).then(data => {
      console.log(data)
      that.setData({
        goods_list: that.data.goods_list.concat(data.list),
      })
    })
  },

  reach: function () {
    var that = this
    if (that.data.keyword == undefined) {
      that.data.keyword = ''
    }
    var keyword = that.data.keyword
    var page = 1
    http.post('goods_list', { page: page, keyword: keyword }).then(data => {
      console.log(data)
      that.setData({
        goods_list: data.list,
        total: data.total
      })
    })
  },
  btn: function () {
    var that = this
    var page = 1
    http.post('goods_list', { page: page }).then(data => {
      console.log(data)
      that.setData({
        goods_list: data.list,
        total: data.total
      })
    })
  }
})