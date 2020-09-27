import ajaxInti from '../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    myfollow:{
      curPage:1,
      PageCount:1,
      oncheck:"checkDetail",
      active:true,
      loadtext:"正在加载...",
      data:[]
    },
    nextfollow:{
      curPage:1,
      PageCount:1,
      oncheck:"checkDetail",
      active:false,
      loadtext:"正在加载...",
      data:[]
    },
    powerfollow:{
      curPage:1,
      PageCount:1,
      oncheck:"checkDetail",
      active:false,
      loadtext:"正在加载...",
      data:[]
    }
  },
  onLoad() {},
  onReady(){
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight-45,
          endwidth: res.windowWidth*0.8-res.windowWidth*0.8*0.32*2-3
        });
      }
    });
  },
  onShow(){
    this.setData({
      "myfollow.curPage":1,
      "myfollow.data":[]
    });
    this.getmyfollow();
  },
  //选择自己跟进
  selectmy(){
    this.setData({
      "myfollow.active":true,
      "nextfollow.active":false,
      "powerfollow.active":false
    });
    if(this.data.myfollow.data.length==0)
    {
      this.getmyfollow();
    }
  },
  //选择跟进拜访
  selectnext(){
    this.setData({
      "myfollow.active":false,
      "nextfollow.active":true,
      "powerfollow.active":false
    });
    if(this.data.nextfollow.data.length==0)
    {
      this.getnextfollow();
    }
  },
  //选择自己跟进
  selectpower(){
    this.setData({
      "myfollow.active":false,
      "nextfollow.active":false,
      "powerfollow.active":true
    });
    if(this.data.powerfollow.data.length==0)
    {
      this.getpowerfollow();
    }
  },
  //获取自己的跟进数据
  getmyfollow(){
    if(this.data.myfollow.curPage<=this.data.myfollow.PageCount)
    {
      var param={
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        curUserId: app.userinfo.uid,
        page: this.data.myfollow.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.FollowUpRecentlyByUser,param,function(resultlist){
          var linsData=that.data.myfollow.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              var createDatestring =app.timeobjecttostring(new Date(dataJson[i].createDate));
              linsData.push(
                {
                  id:dataJson[i].id,
                  createDate:createDatestring.substring(5,createDatestring.length),
                  linkMan:dataJson[i].linkMan,
                  endLinkMan:dataJson[i].endLinkMan,
                  linkWay:app.getFollowupWay(dataJson[i].linkWay).title,
                  custName:dataJson[i].custName
                });
          };
          that.setData({
            "myfollow.data":linsData,
            "myfollow.curPage":curPage+1,
            "myfollow.PageCount":PageCount
          });
          var loadtext="";   
          if(curPage==PageCount)
          {
            loadtext='没有更多数据...';
          }
          else{
            loadtext='上拉加载更多...';
          }
          if(dataJson.length==0&&curPage==1)
          {
            loadtext='没有更多数据...';
          }
          that.setData({
            "myfollow.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "myfollow.loadtext":'没有更多数据...'
        });
    }
  },
  //获取拜访计划数据
  getnextfollow(){
    if(this.data.nextfollow.curPage<=this.data.nextfollow.PageCount)
    {
      var param={
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        page: this.data.nextfollow.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetFollowupPlanList,param,function(resultlist){
          var linsData=that.data.nextfollow.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              var createDatestring =app.timeobjecttostring(new Date(dataJson[i].linkDate));
              linsData.push(
                {
                  id:dataJson[i].id,
                  linkDate:createDatestring,
                  custName:dataJson[i].custName,
                  content:dataJson[i].content
                });
          };
          that.setData({
            "nextfollow.data":linsData,
            "nextfollow.curPage":curPage+1,
            "nextfollow.PageCount":PageCount
          });
          var loadtext="";   
          if(curPage==PageCount)
          {
            loadtext='没有更多数据...';
          }
          else{
            loadtext='上拉加载更多...';
          }
          if(dataJson.length==0&&curPage==1)
          {
            loadtext='没有更多数据...';
          }
          that.setData({
            "nextfollow.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "nextfollow.loadtext":'没有更多数据...'
        });
    }
  },
  //获取有权查看数据
  getpowerfollow(){
    if(this.data.powerfollow.curPage<=this.data.powerfollow.PageCount)
    {
      var param={
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        curUserId: app.userinfo.uid,
        page: this.data.powerfollow.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.FollowUpRecentlyByUser,param,function(resultlist){
          var linsData=that.data.powerfollow.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              var createDatestring =app.timeobjecttostring(new Date(dataJson[i].createDate));
              linsData.push(
                {
                  id:dataJson[i].id,
                  createDate:createDatestring.substring(5,createDatestring.length),
                  linkMan:dataJson[i].linkMan,
                  endLinkMan:dataJson[i].endLinkMan,
                  linkWay:app.getFollowupWay(dataJson[i].linkWay).title,
                  custName:dataJson[i].custName
                });
          };
          that.setData({
            "powerfollow.data":linsData,
            "powerfollow.curPage":curPage+1,
            "powerfollow.PageCount":PageCount
          });
          var loadtext="";   
          if(curPage==PageCount)
          {
            loadtext='没有更多数据...';
          }
          else{
            loadtext='上拉加载更多...';
          }
          if(dataJson.length==0&&curPage==1)
          {
            loadtext='没有更多数据...';
          }
          that.setData({
            "powerfollow.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "powerfollow.loadtext":'没有更多数据...'
        });
    }
  },
  //客户跟进分页
  myscroll:function(e){
      if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "myfollow.loadtext":'正在加载...',
      });
      //底部
      this.getmyfollow();
    } 
  },
  //刷新
  myrefreshre:function(e){
    //顶部
    this.setData({
      "myfollow.curPage":1,
      "myfollow.loadtext":'刷新数据中...',
      "myfollow.data":[]
    });
    this.getmyfollow();
  },
  //客户跟进分页
  powerscroll:function(e){
      if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "powerfollow.loadtext":'正在加载...',
      });
      //底部
      this.getpowerfollow();
    } 
  },
  //刷新
  powerrefreshre:function(e){
    //顶部
    this.setData({
      "powerfollow.curPage":1,
      "powerfollow.loadtext":'刷新数据中...',
      "powerfollow.data":[]
    });
    this.getpowerfollow();
  },
  //客户跟进分页
  nextscroll:function(e){
      if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "nextfollow.loadtext":'正在加载...',
      });
      //底部
      this.getnextfollow();
    } 
  },
  //刷新
  nextrefreshre:function(e){
    //顶部
    this.setData({
      "nextfollow.curPage":1,
      "nextfollow.loadtext":'刷新数据中...',
      "nextfollow.data":[]
    });
    this.getnextfollow();
  },
  //查看跟进详情
  checkDetail:function(e){
    const page = 'followinfo/followinfo?id='+e.currentTarget.dataset.id;
    dd.navigateTo({ url: page });
  }
});
