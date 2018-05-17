// recycle/pages/profile/profile.js
import http from '../../util/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Multi_ple:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var realname = wx.getStorageSync('realname')
    var mobile = wx.getStorageSync('mobile')
    this.setData({
      realname: realname,
      mobile: mobile
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
  formSubmit:function(e){
    var that=this
    var name=e.detail.value.name
    var mobile = e.detail.value.mobile
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phoneReg.test(mobile)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确电话'
      })
      return false;
    }
    // var Multi_ple = that.data.Multi_ple;
    // if (Multi_ple == 1) {
    //   return false;
    // }
    // that.setData({
    //   Multi_ple: '1'
    // })
    http.post('update_member', { realname: name, mobile: mobile}).then(data=>{
      console.log(data)
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
        complete:function(){
          wx.redirectTo({
            url: '../index/index',
          })
        }
      })
      
    })
  }
})