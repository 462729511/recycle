// recycle/pages/callrecycl/callrecycl.js
import http from '../../util/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['附近废品哥','回收商圈'],
    page:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page=1
    var that=this
    http.post('Recycler_list',{page:page}).then(data=>{
        console.log(data)
        that.setData({
          recyclerList:data.list,
          total:data.total
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
  onTabsItemTap:function(e){
    var index = e.currentTarget.dataset.id;
    this.setData({
      currentTabsIndex:index
    })
  },
  onReachBottom: function () {
    var that = this
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
      return false
    }
    http.post('Recycler_list', { page: page }).then(data => {
      console.log(data)
      that.setData({
        recyclerList: that.data.recyclerList.concat(data.list)
      })
    })
  },
  detail:function(e){
    var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../recyclDetail/recyclDetail?id='+id,
      })
  },
  reach: function () {
    var that = this
    if (that.data.keyword == undefined) {
      that.data.keyword = ''
    }
    var keyword = that.data.keyword
    var page = 1
    http.post('Recycler_list', { page: page, keyword: keyword }).then(data => {
      console.log(data)
      that.setData({
        recyclerList: data.list,
        total: data.total
      })
    })
  },
  btn:function(){
    var page = 1
    var that = this
    http.post('Recycler_list', { page: page }).then(data => {
      console.log(data)
      that.setData({
        recyclerList: data.list,
        total: data.total
      })
    })
  }
})