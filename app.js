//app.js
import util from 'we7/resource/js/util.js';
App({
  data:{
    openid:'',
    sessionid:''
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    var that=this;
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code=res.code;
        util.request({
          url: 'auth/session/openid',
          data: { code: code ? code : '' },
          cachetime: 0,
          showLoading: false,
          success: function (session) {
            if (session.data.data.openid){
              wx.setStorageSync('openid', session.data.data.openid);
              wx.setStorageSync('sessionid', session.data.data.sessionid);
            }
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    
  },
  onHide: function () {
  },
  onError: function (msg) {
    console.log(msg)
  },
  util: util,
  globalData: {
    userInfo: null,
  },
  siteInfo: require('siteinfo.js')
});