// we7_wxappdemo/pages/index/index.js
import http from '../../util/request.js';
var QQMapWX = require('../../util/qqmap-wx-jssdk.min.js');
import util from '../../../we7/resource/js/util.js'
var qqmapsdk;
var qqMapWX = new QQMapWX({
  key: 'HQSBZ-CDD6S-HPFO6-6GZYN-H2YA2-L4BML' // 必填
});
const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
     list:[],
     isShow:true,
     show:true,
     video:'',
     userInfo: {},
     hasUserInfo: false,
     canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.setStorageSync('latitude', latitude)
        wx.setStorageSync('longitude', longitude)
        http.post('address', { lat: latitude, lng: longitude}).then(data=>{
            that.setData({
              city:data.city
            })
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    util.getUserInfo();
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  load() {
    var that=this;
    http.post('index').then(data=>{
      // console.log(data);
      that.setData({
        phone:data.copyphone,
        video:data.index_video,
        title:data.title,
        thumbnail: data.thumbnail
      })
      wx.setStorageSync('realname', data.member.realname)
      wx.setStorageSync('mobile', data.member.mobile)
      wx.setStorageSync('title', data.title)
      wx.setNavigationBarTitle({
        title: that.data.title
      })
    })
  },
  

  dateformat: function(time) {
     console.log('format');
     return new Date(time*1000).toLocaleString();
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
      this.load();
    
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
  share:function(res){
    var title=this.data.title
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/index?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  animationa:function(){
    var that = this
    var animation = wx.createAnimation({
      // duration: 1000,
      timingFunction: 'ease',
    })
    that.animation=animation
    animation.translateX(250).step();
    that.setData({
      animationData: animation.export(),
      isShow:false,
      show:false
    })
  },

  back:function(){
    var that=this
    var animation = wx.createAnimation({
      // duration: 1000,
      timingFunction: 'ease',
    })
    that.animation = animation
    animation.translateX(0).step();
    that.setData({
      animationData: animation.export(),
      isShow: true,
      show: true
    })
  },
  call:function(){
    var tel = this.data.phone
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
      },
      fail: function () {
      }
    })
  },
  reservation:function(){
    wx.navigateTo({
      url: '../reservation/reservation',
    })
  },
  sell:function(){
    wx.navigateTo({
      url: '../sell/sell?id=' + 1,
    })
  },
  buy:function(){
    wx.navigateTo({
      url: '../buy/buy' 
    })
  },
  callrecycl:function(){
    wx.navigateTo({
      url: '../callrecycl/callrecycl',
    })
  },
  recycl:function(){
    wx.navigateTo({
      url: '../recycl/recycl',
    })
  },
  onReady: function () {  //创建视频上下文对象
    this.videoContext = wx.createVideoContext('myVideo')
  },
  videoPlay(e) {
    this.setData({
      curr_id: e.currentTarget.dataset.id,
    })
    this.videoContext.play()
  },
  profile:function(){
    wx.navigateTo({
      url: '../profile/profile',
    })
  },
  order:function(){
    wx.navigateTo({
      url: '../orders/orders',
    })
  }
})