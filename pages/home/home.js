let base_img_url = 'https://www.antleague.com/faces/'
let qn_img_url = 'http://antleague.com/'
var share_img
var share_title
var new_app_id
var new_pre_img
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: base_img_url,
    qn_img_url: qn_img_url,
    new_app_id:'wxea1ee90fb7d7797a',
    is_nav: true,
    isUse: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '小黄鸭魔性图',
    })

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('sdk version--->' + res.SDKVersion)
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
    })
  },

  newApp: function (e) {
    var that = this
    wx.navigateToMiniProgram({
      appId: that.data.new_app_id
    })
  },

  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },

  imagedetail:function(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/faceshow/faceshow?index=' + index,
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '@你快来玩有趣的魔性小黄鸭表情吧!',
      path: '/pages/home/home',
      imageUrl: '../../images/share_img.png'
    }
  },
})