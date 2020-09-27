import ajaxInti from '../../CommonComponent/ajaxlist.js';
let app = getApp();
Page({
  data: {
    nowtime:'',
    address:'',
    remark:'',
    todayAttend:{}
  },
  onLoad() {
    this.setData({
      "todayAttend":{},
      "addresswidth": dd.getSystemInfoSync().windowWidth - 16 - 42 - 10,
      "nowaddresswidth": dd.getSystemInfoSync().windowWidth -30-70-15,
    })
    this.getlocation();
    this.gettodayAttend();
  },
  onShow(){
    var that=this;
    that.setinterval = setInterval(() => {
      this.setData({
        "nowtime": app.getCurDate()
      })
    }, 1000) 
  },
  onHide(){
    clearInterval(this.setinterval) 
  },
  //获取当日考勤
  gettodayAttend:function(){
    var param = {
      firmId: app.userinfo.firmId,
      userId: app.userinfo.uid
    };
    var that = this;
    ajaxInti.IntiContent(that, app, app.APIURL.GetTodayAttend, param, function(result) {
      if (app.vnull(result.data.onTime))
      {
        result.data.onTime = new Date(result.data.onTime).getHours().toString() + ":" + new Date(result.data.onTime).getMinutes().toString();
      }
      if (app.vnull(result.data.offTime)) {
        result.data.offTime = new Date(result.data.offTime).getHours().toString() + ":" + new Date(result.data.offTime).getMinutes().toString();
      }
      that.setData({
        "todayAttend": result.data
      });
    });
  },
  //上班打卡
  OnAttend:function(){
    var todayAttend = this.data.todayAttend;
    var device = dd.getSystemInfoSync();
    var onParam = {
      id: (!app.vnull(todayAttend.onTime)? '' : todayAttend.id),
      userId: app.userinfo.uid,
      fullName: dd.getStorageSync({ key: "userInfo" }).data.fullName,
      firmId: app.userinfo.firmId,
      onLat: this.data.lat,
      onLng: this.data.lng,
      onAddress: this.data.address,
      onRemark: this.data.remark,
      onDevice: device.model,
      onMode: 7,
      onUuid: device.brand + device.system,
      jobNo: ''
    };
    var that=this;
    if (app.vnull(todayAttend.onTime))
    {
      dd.confirm({
        title:'',
        content: '已打过上班卡，确定继续打卡?',
        confirmButtonText: '考勤',
        cancelButtonText: '点错了',
        success: (result) => {
          if (result.confirm) {
            dd.showLoading({
              content: '打卡中...'
            });
            ajaxInti.InitSubmitPage(that, app, app.APIURL.AttendOnSave, onParam, function(result) {
                dd.hideLoading();
                app.showToast("success",'打卡成功');
                that.setData({
                  "remark":""
                })
                that.gettodayAttend();
            },function(fail){
              dd.hideLoading();
              app.showToast("fail", app.API_ERRORTEXT(fail));
            },false);
          }
        }
      })
    }else{
      dd.showLoading({
        content: '打卡中...'
      });
      ajaxInti.InitSubmitPage(that, app, app.APIURL.AttendOnSave, onParam, function(result) {
        dd.hideLoading();
        app.showToast("success", '打卡成功');
        that.setData({
          "remark": ""
        })
        that.gettodayAttend();
      }, function(fail) {
        dd.hideLoading();
        app.showToast(
          "fail", app.API_ERRORTEXT(fail)
        );
      },false);
    }
  },
  //下班打卡
  OffAttend:function(){
    var todayAttend = this.data.todayAttend;
    var device = dd.getSystemInfoSync();
    var offParam = {
      id: (!app.vnull(todayAttend.offTime) ? '' : todayAttend.id),
      userId: app.userinfo.uid,
      fullName: dd.getStorageSync({ key: "userInfo" }).data.fullName,
      firmId: app.userinfo.firmId,
      offLat: this.data.lat,
      offLng: this.data.lng,
      offAddress: this.data.address,
      offRemark: this.data.remark,
      offDevice: device.model,
      offMode: 7,
      offUuid: device.brand + device.system,
      jobNo: ''
    };
    var that = this;
    if (app.vnull(todayAttend.offTime)) {
      dd.confirm({
        title: '',
        content: '已打过下班卡，确定继续打卡?',
        confirmButtonText: '考勤',
        cancelButtonText: '点错了',
        success: (result) => {
          if (result.confirm) {
            dd.showLoading({
              content: '打卡中...'
            });
            ajaxInti.InitSubmitPage(that, app, app.APIURL.AttendOffSave, offParam, function(result) {
              dd.hideLoading();
              app.showToast("success", '打卡成功');
              that.setData({
                "remark": ""
              })
              that.gettodayAttend();
            }, function(fail) {
              dd.hideLoading();
              app.showToast("fail", app.API_ERRORTEXT(fail));
            }, false);
          }
        }
      })
    } else {
      dd.showLoading({
        content: '打卡中...'
      });
      ajaxInti.InitSubmitPage(that, app, app.APIURL.AttendOffSave, offParam, function(result) {
        dd.hideLoading();
        app.showToast("success", '打卡成功');
        that.setData({
          "remark": ""
        })
        that.gettodayAttend();
      }, function(fail) {
        dd.hideLoading();
        app.showToast(
          "fail", app.API_ERRORTEXT(fail)
        );
      }, false);
    }
  },
  getlocation: function() {
    var that = this;
    dd.getLocation({
      type:3,
      success(res) {
        my.hideLoading();
        that.setData({
          "lng": res.longitude,
          "lat": res.latitude,
          "address": res.address
        })
      },
      fail(err) {
        my.hideLoading();
        var errtext = "网络异常，请检查网络重新定位";
        switch (err) {
          case 11:
            errtext = "定位失败,请打开GPS!";
            break;
          case 12:
            errtext = "网络异常，请检查网络重新定位";
          case 13:
            errtext = "定位失败，请移步至空旷地点重试";
          case 14:

            break;
        }
        my.alert({ title: errtext });
      },
    })
  },
  historylist:function(){
    dd.navigateTo({ url: "historyattence/historyattence" });
  },
  //文本变换赋给实体值
  getinputvalue: function(e) {
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    var data = this.data;
    for (var object in data) {
      if (data[object] == null) {
        app.setinputtodata(object, data, name, value);
      }
      else if (object == name) {
        data[object] = value;
      }
    }
  }
});
