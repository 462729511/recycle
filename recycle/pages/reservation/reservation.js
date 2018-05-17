// recycle/pages/sell/sell.js
import http from '../../util/request.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    imgspath: [],
    time: '09:00',
    typ: 0,
    Multi_ple: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var clock = year + "-";
    if (month < 10)
      clock += "0";
    clock += month + "-";
    if (day < 10)
      clock += "0";
    clock += day + " ";
    console.log(clock)
    this.setData({
      date: clock,
      id: id
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
  chooseimage: function () {
    if (this.data.tempFilePaths.length > 6) {
      wx.showModal({
        title: '提示',
        content: '最多上传7张图片',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    }
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: _this.data.tempFilePaths.concat(res.tempFilePaths)
        })
      }
    })
  },
  deleteImg: function (e) {
    var imgs = this.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      tempFilePaths: imgs
    });
  },
  getAdd: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        http.post('address', { lat: latitude, lng: longitude }).then(data => {
          that.setData({
            city: data.city,
            district: data.district,
            province: data.province
          })
        })
      }
    })
  },
  phoneChange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressChange: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  changeSwitch: function (e) {
    console.log(e)
    var that = this
    if (e.detail.value = true) {
      that.setData({
        typ: 1
      })
    } else if (e.detail.value = false) {
      that.setData({
        typ: 0
      })
    }
    console.log(this.data.typ)
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    var warn = "";
    var flag = true;
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    var phone = e.detail.value.phone
    if (!phoneReg.test(phone)) {
      warn = '请输入正確电话'
    } else if (e.detail.value.address == "") {
      warn = '请输入地址'
    } else if (e.detail.value.description == "") {
      warn = '请输入废品描述'
    } else if (this.data.tempFilePaths == "") {
      warn = "请上传图片"
    } else {
      flag = false
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
      return false;
    }
    var mobile = this.data.phone
    var address = e.detail.value.address
    var siteinfo = app.siteInfo;
    var type = e.detail.value.checkbox
    var description = e.detail.value.description;
    var images = this.data.imgspath
    var date = this.data.date
    var time = this.data.time
    var lng = wx.getStorageSync('longitude')
    var lat = wx.getStorageSync('latitude')
    var reservetime = date + ' ' + time
    console.log(reservetime)
    var url = siteinfo.siteroot + '?i=' + siteinfo.uniacid + '&t=0&v=' + siteinfo.version + '&' + 'from=wxapp&c=entry&a=wxapp&do=uploadimg&m=' + siteinfo.name;
    var data = {
      mobile,
      address,
      description,
      type,
      reservetime,
      lng,
      lat,
      images
    }
    that.uploadimg({
      url: url,//这里是你图片上传的接口
      path: that.data.tempFilePaths,//这里是选取的图片的地址数组
      data: data
    });
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: { 'imgtype': data.path[i], 'oncode': data.path[i] },
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1

        var path = JSON.parse(resp.data);
        var imgspath = that.data.imgspath;
        imgspath.push(path)
        that.setData({
          imgspath: imgspath
        })

        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {

        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          data.data['image'] = that.data.imgspath;
          var Multi_ple = that.data.Multi_ple;
          if (Multi_ple == 1) {
            return false;
          }
          that.setData({
            Multi_ple: '1'
          })
          http.post('Post_goods', data.data).then(data => {
            console.log(data);
            wx.redirectTo({
              url: '../index/index?id=' + data.book_id,
            })

          })
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})