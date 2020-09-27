import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp();
Page({
  data: {
    userList:{
      onItemTap: 'tapfirst',
      onItemTapCheck:'tapuser',
      data:[]
    },
    userListChildren:{
      onItemTap: 'tapfirst',
      onItemTapCheck:'tapuser',
      data:[]
    }
  },
  onLoad() {
    var UserInfoDeptAndComPanyCache=dd.getStorageSync({ key: "UserInfoDeptAndComPanyCache" });
       this.setData({
        'scrollheight': app.sysinfo.windowHeight-60,
        'userList.rightwidth':"200px",//app.sysinfo.windowWidth-54
        'userList.data':UserInfoDeptAndComPanyCache.data,
        'userListChildren.data':UserInfoDeptAndComPanyCache.data[0]
      });
      this.blurchange();
  },
  focuchange:function(e){
    this.setData({
       "inputwidth":app.sysinfo.windowWidth-10-32-46-10,
       "Issearchbtn":true
    });
  },
  blurchange:function(){
    this.setData({
       "inputwidth":app.sysinfo.windowWidth-10-32,
       "Issearchbtn":false
    });    
  },
  //点击公司展开层级
  tapfirst:function(e){
    var taponline=0;
    var userList=this.data.userList.data;
    var setvalue=1;
    if(e.currentTarget.dataset.item.checkeds==1)
    {
      setvalue=0;
    }
    for(var i=0;i<userList.length;i++)
    {
      var temp=userList[i];
      if(temp.id==e.currentTarget.dataset.item.id)
      {
         userList[i].checkeds=setvalue;
         taponline++;
         break;
      }
      if(taponline==0)
      {
         if(this.eachchildrendeptto(userList[i].children,e.currentTarget.dataset.item.id,setvalue,taponline)==1)
          {
            break;
          }
      }
    }
    this.setData({
      'userList.data':userList
    });
  },
  //部门层级下展开人员
  tapuser:function(e){
    var taponline=0;
    var userList=this.data.userList.data;
    var setvalue=1;
    if(e.currentTarget.dataset.item.checkeds==1)
    {
      setvalue=0;
    }
    
    for(var i=0;i<userList.length;i++)
    {
        if(userList[i].presonList!=null&&userList[i].presonList!=undefined&&userList[i].presonList!=""&&userList[i].presonList.length>0)
        {
            for(var m=0;m<userList[i].presonList.length;m++)
            {
              if(userList[i].presonList[m].id==e.currentTarget.dataset.item.id)
              {
                userList[i].presonList[m].checkeds=setvalue;
                taponline++;
                break;
              }
            }
        }
        if(taponline==0)
        {
          //需要继续找到子项中的数据匹配
          if(this.eachchildrento(userList[i].children,e.currentTarget.dataset.item.id,setvalue,taponline)==1)
          {
            break;
          }
        }
    }
    
    this.setData({
      'userList.data':userList
    });
  },
  //循环子项
  eachchildrendeptto:function(children,selid,setvalue,taponline){
   
    if(children!=null&&children!=undefined&&children!="")
    {
      for(var i=0;i<children.length;i++)
      {
        if(children[i].id==selid)
        {
           children[i].checkeds=setvalue;
           taponline++;
           break;
        }
        if(taponline==0)
        {
          if(this.eachchildrendeptto(children[i].children,selid,setvalue,taponline)==1)
          {
            break;
          }
        }
      }
    }
  },
  //循环子项
  eachchildrento:function(children,selid,setvalue,taponline){
   
    if(children!=null&&children!=undefined&&children!="")
    {
      for(var i=0;i<children.length;i++)
      {
        if(children[i].presonList!=null&&children[i].presonList!=undefined&&children[i].presonList!=""&&children[i].presonList.length>0)
        {
            for(var m=0;m<children[i].presonList.length;m++)
            {
              if(children[i].presonList[m].id==selid)
              {
                userList[i].presonList[m].checkeds=setvalue;
                taponline++;
                break;
              }
            }
        }
        if(taponline==0)
        {
          if(this.eachchildrendeptto(children[i].children,selid,setvalue,taponline)==1)
          {
            break;
          }
        }
      }
    }
  }
});
