let app = getApp()
Page({
  data: {
    Login:{
      phoneNum:'',
      pwd:'',
      uuid:'',
      timestamp:''
    },
    loadtype:false
  },
  onLoad() {
   let res = dd.getStorageSync({ key: "userInfo" });
    if(app.vnull(res.data))
    {
      this.setData({
      "Login.phoneNum":res.data.phoneNum
      })
    }
     this.setData({
      "left":(app.sysinfo.windowWidth-226-21)/2,
      "top":app.sysinfo.windowHeight*0.4,
      "imagetop":(app.sysinfo.windowHeight*0.4-112.55)/2,
      "imageleft":(app.sysinfo.windowWidth-112.55)/2,
    });
  },
  login:function(){
    this.setData({
      "loadtype":true
    })
    app.LoginData={
      phoneNum: this.data.Login.phoneNum,
      pwd: this.data.Login.pwd,
      uuid: '123',
      timestamp: (new Date().getTime()).toString()
    };
    var that=this;
    app.Login(null,function(){
      //成功跳转列表页面
       that.setData({
          "loadtype":false
       })
      app.showToast("success","登录成功");
      dd.reLaunch({
        url: '/pages/index/index'
      })
    },function(eorr){
      //失败显示失败原因
       that.setData({
          "loadtype":false
       })
      app.showToast("fail",eorr)
    })
  },
  //文本变换赋给实体值
  getinputvalue:function(e){
   var name= e.currentTarget.dataset.name;
   var value=e.detail.value;
   var data=this.data.Login;
   for(var object in data)
   {
     if(data[object]==null)
     {
        app.setinputtodata(object,data,name,value);
     }
     else if(object==name)
      {
        data[object]=value;
      }
   }
  }
});
