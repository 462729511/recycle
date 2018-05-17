// recycle/pages/recyclDetail/recyclDetail.js
import http from '../../util/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    var that= this
    http.post('recycler_detail', { recycler_id:id}).then(data=>{
      that.setData({
        address:data.address,
        description: data.description,
        mobile:data.mobile,
        title:data.title,
        images:data.images
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
  img: function (e) {
    var that = this
    var current = e.target.dataset.src;
    wx.previewImage({    
      current: current, // 当前显示图片的http链接
      urls: that.data.images // 需要预览的图片http链接列表
    })
  }
})