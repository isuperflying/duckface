let base_img_url = 'http://antleague.com/'
//获取应用实例
const app = getApp()
let resultSavePath
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_nav: true,
    isUse: true,
    new_app_id: 'wxea1ee90fb7d7797a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '小黄鸭魔性图',
    })

    //console.log(app.globalData.new_app_id)
    resultSavePath = base_img_url + (parseInt(options.index) + 1) + '.gif'
    this.setData({
      currrent_img: resultSavePath,
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

  saveImg: function () {
    console.log("down img https--->" + resultSavePath);

    wx.previewImage({
      urls: [resultSavePath],
      current: resultSavePath
    })
  },
  downimage: function () {

    if (resultSavePath) {
      wx.showLoading({
        title: '文件下载中',
      })
      //文件下载
      wx.downloadFile({
        url: resultSavePath,
        success:
          function (res) {
            console.log(res);
            //图片保存到本地
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (data) {
                wx.hideLoading()
                console.log("save success--->" + data);
                wx.showToast({
                  title: '图片已保存',
                })
              },
              fail: function (err) {
                wx.hideLoading()
                console.log(err);
                if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                  console.log("用户一开始拒绝了，我们想再次发起授权")
                  console.log('打开设置窗口')
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      }
                      else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
                }
              }
            })
          }
      })
    } else {
      wx.showToast({
        title: '保存失败，请稍后再试',
      })
    }
  },
  
  newApp: function (e) {
    wx.navigateToMiniProgram({
      appId: new_app_id
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