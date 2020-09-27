import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    list: {
      curPage: 1,
      PageCount: 1,
      loadtext: "正在加载...",
      data: []
    },
    DatePicker: {
      isShow: false,
      val: [0, 0, 0],
      lastval: [0, 0, 0],
      year: [],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: []
    }
  },
  onLoad() {
    // this.setData({
    //   "attendDate": new Date().getMonth().toString() + "-" + new Date().getDate().toString()
    // })
    this.setData({
      "scrollheight": dd.getSystemInfoSync().windowHeight-36-15,
      "addresswidth": dd.getSystemInfoSync().windowWidth-110-30,
      "list.data":[]
    })
    var that=this;
    ajaxInti.IntiDatePicker(that, '1900-01-01', '2100-01-01', app.timeobjecttostring(new Date(), "YYYY-MM-dd"))
    that.setData({
      "DatePicker.lastval": this.data.DatePicker.val
    })
    that.getlist();
  },
  //获取打卡历史列表
  getlist() {
    if (this.data.list.curPage <= this.data.list.PageCount) {
      var param = {
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        attendDate: (app.vnull(this.data.attendDate) ? this.data.attendDate:''),
        page: this.data.list.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that = this;
      ajaxInti.InitPageList(that, app, app.APIURL.GetAttendHistory, param, function(resultlist) {
        var linsData = that.data.list.data;
        var dataJson = resultlist.data.dataList;
        var PageCount = resultlist.data.pageCount;
        var curPage = resultlist.data.curPage;
        for (var i = 0; i < dataJson.length; i++) {
          linsData.push(
            {
              "onDate": new Date(dataJson[i].sign_time).getMonth().toString() + "-" + new Date(dataJson[i].sign_time).getDate().toString(),
              "onTime": new Date(dataJson[i].sign_time).getHours().toString() + ":" + new Date(dataJson[i].sign_time).getMinutes().toString(),
              "type": (dataJson[i].logType == 0 ? '上' : '下'),
              "isValid": (dataJson[i].isValid == 1 ? '' : '<text style=\"color:red\">!</text>'),
              "address": dataJson[i].address
           });
        };
        that.setData({
          "list.data": linsData,
          "list.curPage": curPage + 1,
          "list.PageCount": PageCount
        });
        var loadtext = "";
        if (curPage == PageCount) {
          loadtext = '没有更多数据...';
        }
        else {
          loadtext = '上拉加载更多...';
        }
        if (dataJson.length == 0 && curPage == 1) {
          loadtext = '没有更多数据...';
        }
        that.setData({
          "list.loadtext": loadtext
        });
        if (that.data.scrollheight / 36 > linsData.length && curPage != PageCount)
        {
          that.getlist();
        }
      });
    } else {
      this.setData({
        "list.loadtext": '没有更多数据...'
      });
    }
  },
  myscrolllist:function(e){
    if (e.detail.scrollHeight - e.detail.scrollTop == this.data.scrollheight) {
      this.setData({
        "list.loadtext": '正在加载...',
      });
      //底部
      this.getlist();
    }
  },
  openDatePicker: function() {
    this.setData({
      "DatePicker.isShow": !this.data.DatePicker.isShow
    });
    if (this.data.DatePicker.isShow == false) {
      var datemodel = this.data.DatePicker;
      this.setData({
        "attendDate": datemodel.year[datemodel.val[0]] + "-" + datemodel.month[datemodel.val[1]] + "-" + datemodel.day[datemodel.val[2]],
        "list.curPage":1,
        "list.data": []
      });
      this.getlist();
    }
  },
  closeDatePicker: function() {
    this.setData({
      "DatePicker.isShow": !this.data.DatePicker.isShow,
      "DatePicker.val": this.data.DatePicker.lastval
    });
  },
  DatePickerChange: function(e) {
    let val = e.detail.value;
    var selval = this.data.DatePicker.val;
    if (val[0] != selval[0] || val[1] != selval[1] || val[2] != selval[2]) {
      ajaxInti.IntiDatePicker(this, '1900-01-01', '2100-01-01', this.data.DatePicker.year[val[0]] + "-" + this.data.DatePicker.month[val[1]] + "-" + this.data.DatePicker.day[val[2]]);
    }
  },
  cleartime: function() {
    this.setData({
      "DatePicker.isShow": false,
      "DatePicker.val": this.data.DatePicker.lastval,
      "list.curPage": 1,
      "list.data":[],
      "attendDate": ''
    });
    this.getlist();
  }
});
