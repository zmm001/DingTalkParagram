import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp();
Page({
  data: {
    userList:{
    
    },
    seluser:[]
  },
  onLoad(backparam) {
      var UserInfoAllCache=dd.getStorageSync({ key: "UserInfoAllCache" });
       this.setData({
        'scrollheight': app.sysinfo.windowHeight-60,
        'userList.rightwidth':app.sysinfo.windowWidth-54-35,//
        'userList.srcheight': app.sysinfo.windowHeight-34-48,
        'seluser':[],
        'backName':backparam
      });
      this.blurchange();
      if(app.vnull(backparam.userId)&&app.vnull(backparam.Name))
      {
        var seluser=[];
          if(UserInfoAllCache.data.length>0)
          {
            for(var i=0;i<UserInfoAllCache.data.length;i++)
            {
              if(backparam.userId.indexOf(UserInfoAllCache.data[i].id)>-1)
              {
                  UserInfoAllCache.data[i].checkeds=1;
                  seluser.push({Name:UserInfoAllCache.data[i].fullName,userId:UserInfoAllCache.data[i].id});
              }
            }
          }
          this.setData({
            'userList.data':UserInfoAllCache.data,
            'seluser':seluser
          })
      }else{
        this.setData({
            'userList.data':UserInfoAllCache.data
          })
      }
  },
  focuchange:function(e){
    this.setData({
       "inputwidth":app.sysinfo.windowWidth-10-32-46-10,
       "Issearchbtn":true
    });
  },
  blurchange:function(e){
    var searchtext="";
    if(e!=null)
    {
      searchtext=e.detail.value;
    }
    this.setData({
       "inputwidth":app.sysinfo.windowWidth-10-32,
       "Issearchbtn":false,
       "searchText":searchtext
    });    
  },
  tapuser:function(e){
    var userList=this.data.userList.data;
    var seluser=this.data.seluser;
    var setvalue=1;
    if(e.currentTarget.dataset.item.checkeds==1)
    {
      setvalue=0;
    }
    for(var i=0;i<userList.length;i++)
    {
        if(userList[i].id==e.currentTarget.dataset.item.id)
        {
            if(setvalue==1)
            {
              if((this.data.backName.IsMulti==0||this.data.backName.IsMulti=='0')&&seluser.length>0)
              {
                //单选时只能选择一个人员
                
              }else{
                userList[i].checkeds=setvalue;
                seluser.push({Name:userList[i].fullName,userId:userList[i].id});
              }
            }else{
              userList[i].checkeds=setvalue;
              // seluser.remove({Name:userList[i].fullName,userId:userList[i].id});
              for(var m=0;m<seluser.length;m++)
              {
                if(seluser[m].userId==userList[i].id)
                {
                  //这里移除已选择的人员
                  seluser.splice(m,1);
                }
              }
            }
            break;
        }
    }
    this.setData({
      'userList.data':userList,
      'seluser':seluser
    });
  },
  backlastPage:function(){
     var pages=getCurrentPages();
      pages[pages.length-2].setData({
        "backsetParam":{
          userList:this.data.seluser,
          type:this.data.backName.type
        }
      })
    dd.navigateBack({
      delta: 1
    });
  },
  search:function(e){
    //本地检索
    var UserList=this.data.userList.data;
    if(UserList.length>0&&app.vnull(this.data.searchText))
    {
      for(var i=0;i<UserList.length;i++)
      {
        if(UserList[i].fullName.indexOf(this.data.searchText)==-1)
        {
            UserList[i].ishide=1;
        }else{
            UserList[i].ishide=0;
        }
      }
    }else{
      for(var i=0;i<UserList.length;i++)
      {
          UserList[i].ishide=0;
      }
    }
     this.setData({
      'userList.data':UserList
    });
  }
});
