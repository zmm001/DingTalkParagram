import ajaxInti from '../CommonComponent/ajaxlist.js';
let app = getApp();

Page({
  data: {
    pageName: 'index/index',
    arr: {
      onItemTap: 'onGridItemTap',
      list: [{
        icon: '../../images/daiban.png',
        title: '待办',
        entitle: 'daiban',
        page: 'daiban/daibanList'
      }, {
        icon: '../../images/shenpi.png',
        title: '日常检查',
        entitle: 'check',
        page: 'check/checkList'
      }, {
        icon: '../../images/customer.png',
        title: '客户',
        entitle: 'customer',
        page: 'customer/customer'
      }, {
        icon: '../../images/gonghai.png',
        title: '公海',
        entitle: 'publicCustomerList',
        page: 'publicCustomerList/publicCustomerList'
      }, {
        icon: '../../images/lxr.png',
        title: '联系人',
        entitle: 'customnerLinkMan',
        page: 'customnerLinkMan/customnerLinkMan'
      }, {
        icon: '../../images/shangji.png',
        title: '商机',
        entitle: 'project',
        page: 'project/project'
      }, {
        icon: '../../images/follow.png',
        title: '跟进',
        entitle: 'follow',
        page: 'follow/follow'
      }, {
        icon: '../../images/bfjh.png',
        title: '拜访计划',
        entitle: 'projectplan',
        page: 'projectplan/projectplan'
      }, {
        icon: '../../images/attence.png',
        title: '考勤',
        entitle: 'attence',
        page: 'attence/attence'
      }
        // , {
        //   icon: '../../images/exit.png',
        //   title: '退出登录',
        //   entitle: 'exit'
        // }
      ]
    },
    check: 'apply',
    icon: '',
    fullName: '',
    firmName: '',
    phoneNum: '',
  },
  onGridItemTap(e) {
    if (this.data.arr.list[e.currentTarget.dataset.index].entitle == "exit") {
      this.LoginOut();
    }
    else {
      const page = this.data.arr.list[e.currentTarget.dataset.index].page;
      dd.navigateTo({ url: page });
    }
  },
  onLoad: function () {
    //此处获取一次登录账号的数据,用于验证账号是否在其他设备登录,token是否被更换
    // app.GetUserInfo();
    //获取人员参数去拼接
    ajaxInti.InitUserListInfo(this, app, function () {
    });
    //获取人员参数去拼接
    ajaxInti.InitUserAllInfo(this, app, function () {
    });
    if (app.getuserinfo() != null) {
      var userinfo = app.getuserinfo();
      var icon = app.getusericon(userinfo.uid);
      var fullName = userinfo.fullName;
      this.setData({
        "icon": icon,
        "fullName": fullName,
        "firmName": userinfo.firmName,
       "phoneNum": userinfo.phoneNum
      });
    }
  },
  onShow() {  },
  LoginOut: function () {
    dd.removeStorage({
      key: 'userInfo',
      success: function () {
        app.LoginData = {};
        dd.reLaunch({
          url: '/pages/index/Login/Login'
        })
      }
    });
  },
  onNavbottom: function (e) {
    this.setData({
      "check": e.currentTarget.dataset.value
    });
  },
  onbtnout: function () {
    this.LoginOut();
  },
  onToHelp:function(){
    dd.navigateTo({ url: 'help/helpPage' })
  },
  onToSys:function(){
    dd.navigateTo({ url: 'help/managePage' })
  }
});
