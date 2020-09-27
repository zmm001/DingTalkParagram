import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()

Page({
  data: {
    followData:{
      addfollow:true,
      
      onItemTap:"checkfollow",
      curPage:1,
      PageCount:1,
      isload:true,
      loadtext:'正在加载...',
      data:[]
    },
    customer:{
      editcustinfo:true
    },
    linkData:{
      addlink:true,
      onchecklink:"checklink",
      onaddlink:"addlink",
      cellphone:"cellphone",
      onaddfollow:"addfollow",
      isload:true,
      data:[]
    },
    selectlink:{
      editlinkinfo:"editlinkinfo"
    }
  },
  onLoad(request) {
    if(request.id!=null&&request.id.length>0)
    {
      //开始加载数据
      this.setData({
        "custId":request.id,
        "activeone":false,
        "activetwo":true,
        "activethree":false,
        "activelink":false,
        "followData.data":[],
        "linkData.data":[],
        "followData.isload":true,
        "addresswidth":app.sysinfo.windowWidth-30-60-15
      });
    }else{
      //此处为测试参数
       this.setData({
        "custId":'1a80537d5858cc73',
        "activelink":false,
        "followData.data":[],
        "linkData.data":[]
      });
      // this.getdetail();
      // this.followcontent();
    //  dd.alert({content:""})
    }
  },
  onShow() {
    // 页面显示
    this.setData({
      "followData.data":[],
      "linkData.data":[],
      "followData.curPage":1,
      "followData.loadtext":"刷新数据中...",
    });
    this.getdetail();
    this.getfollowList();
    this.getlinkList();
    if(app.vnull(this.data.selectlink.id))
    {
      this.getlinkInfo(this.data.selectlink.id);
    }
    var paddingwidth=30+10+45;
    this.setData({
      objectcontentwidth: app.sysinfo.windowWidth-paddingwidth,
      "followData.scrollheight":app.sysinfo.windowHeight-65-50,
      "linkData.scrollheight":app.sysinfo.windowHeight-65-50
    });
  },
  followcontent:function(e){
    var that=this;
    that.setData({
      "activeone":true,
      "activetwo":false,
      "activethree":false,
      "activelink":false
    });
    if(this.data.followData.data.length==0)
    {
      this.getfollowList();
    }
  },
  detailcontent:function(e){
    this.setData({
        "activeone":false,
        "activetwo":true,
        "activethree":false,
        "activelink":false
      });
      if(this.data.customer==null)
      {
        this.getdetail();
      }
  },
  linkcontent:function(e){
    this.setData({
     "activeone":false,
     "activetwo":false,
     "activethree":true,
     "activelink":false
    });
    if(this.data.linkData.data.length==0)
    {
      this.getlinkList();
    }
  },
  closetippage:function(){
    this.setData({
     "activeone":false,
     "activetwo":false,
     "activethree":true,
     "activelink":false
    });
  },
  //获取客户跟进列表数据
  getfollowList(){
    if(this.data.followData.curPage<=this.data.followData.PageCount)
    {
      var param={
        firmId: app.userinfo.firmId,
        custId: this.data.custId,//"1a80537d5858cc73"测试客户
        page: this.data.followData.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetFollowupByCust,param,function(resultlist){
            var linsData=that.data.followData.data;
            var PageCount=resultlist.data.pageCount;
            var curPage=resultlist.data.curPage;
            var dataJson=resultlist.data.dataList;
            for(var i=0;i<dataJson.length;i++)
            {
              var timestring=app.timeobjecttostring(new Date(dataJson[i].linkDate));
              var top=app.getTopValueBelowCust(curPage,30,81,app.PAGE_SIZE.size8,i);
                linsData.push(
                  {
                    id:dataJson[i].id,
                    linkDate:timestring.substring(5,timestring.length),
                    linkWay:dataJson[i].linkWay,
                    linkMan:dataJson[i].linkMan,
                    content:dataJson[i].content,
                    icon:"../../../../images"+app.getFollowupWay(dataJson[i].linkWay).icon,
                    top:top
                  });
            };
            var loadtext="";
            
            that.setData({
              "followData.curPage":curPage+1,
              "followData.data":linsData,
              "followData.PageCount":PageCount
            });   
            if(that.data.followData.curPage-1==PageCount)
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
              "followData.loadtext":loadtext
            });
        });
    }
    else{
       this.setData({
          "followData.loadtext":'没有更多数据...'
        });
    }
  },
  //客户跟进分页
  followscroll:function(e){
    if(e.detail.scrollHeight-e.detail.scrollTop==this.data.followData.scrollheight){ 
      this.setData({
        "followData.loadtext":'正在加载...',
      });
      //底部
      this.getfollowList();
    } 
  },
  myrefreshre:function(){
    //顶部
    this.setData({
      "followData.curPage":1,
      "followData.loadtext":'刷新数据中...',
      "followData.data":[]
    });
    this.getfollowList();
  },
  //获取客户信息
  getdetail:function(){
     var param={
      firmId: app.userinfo.firmId,
      id: this.data.custId
     };
     var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.CustById,param,function(result){
      var detail=result.data.customer;
      var extend=result.data.extend;
      that.setData({
        "customer.custName":app.repaceallbracket(detail.custName),
        "customer.ownUser":detail.ownUser,
        "customer.custId":detail.id,
        "customer.classId":detail.classId,
        "customer.spantext":(detail.typeName).substring(0, 2),
        "customer.updateDate":(app.vnull(detail.updateDate)?app.timeobjecttostring(new Date(detail.updateDate)):''),
        "customer.typeName":detail.typeName,
        "customer.channelName":detail.channelName,
        "customer.province":detail.province,
        "customer.city":detail.city,
        "customer.county":detail.county,
        "customer.address":detail.address,
        "customer.industry":detail.industry,
        "customer.tel":extend.tel,
        "customer.fax":extend.fax,
        "customer.source":''
      });
      that.setsource(extend.source);
    });
  },
  linkscroll:function(){
    // if(e.detail.scrollTop==0)
    // {
    //   //顶部
    //   this.setData({
    //     "linkData.isload":'刷新数据中...',
    //     "linData.data":[]
    //   });
    //   this.getlinkList();
    // };
  },
  linkrefreshre:function(){
    this.setData({
      "linkData.data":[],
      "linkData.isload":true
    });
    this.getlinkList();
  },
  //获取联系人列表
  getlinkList:function(){
    var param={
      firmId: app.userinfo.firmId,
      custId: this.data.custId
    };
    var that=this;
    ajaxInti.InitPageList(that,app,app.APIURL.GetLinkManList,param,function(resultlist){
        var linsData=[];
        var dataJson=resultlist.data;
        for(var i=0;i<dataJson.length;i++)
        {
            var MainCss = dataJson[i].isMain ;
            linsData.push(
              {
                id:dataJson[i].id,
                MainCss:MainCss,
                fullName:dataJson[i].fullName,
                postName:dataJson[i].postName,
                phoneNum:dataJson[i].phoneNum,
                tel:dataJson[i].tel
              });
        };
        that.setData({
          "linkData.data":linsData,
          "linkData.isload":false
        });   
    });
  },
  //获取联系人详情
  getlinkInfo:function(linkid){
     var param={
        id:linkid,
        firmId: app.userinfo.firmId,
        custId: this.data.custId
     };
     var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.ViewLinkMan,param,function(result){
      var detail=result.data;
      that.setData({
        "selectlink.isMain":detail.isMain,
        "selectlink.fullName":detail.fullName,
        "selectlink.sex":detail.sex,
        "selectlink.deptName":detail.deptName,
        "selectlink.postName":detail.postName,
        "selectlink.phoneNum":detail.phoneNum,
        "selectlink.tel":detail.tel,
        "selectlink.email":detail.email,
        "selectlink.qq":detail.qq,
        "selectlink.birthday":(app.vnull(detail.birthday)?app.timeobjecttostring(new Date(detail.birthday)):'')
      });
    });
  },
  //查看联系人
  checklink(e){
    this.getlinkInfo(e.currentTarget.dataset.id);
    this.setData({
      "activelink":true,
      "selectlink.id":e.currentTarget.dataset.id
    });
  },
  //修改联系人
  editlinkinfo(e){

     const page = '../LinkMan/LinkMan?id='+this.data.selectlink.id+'&custId='+this.data.custId;
     dd.navigateTo({ url: page });
  }
  ,
  //编辑客户信息
  editcust(e){
     const page = '../LinkMan/LinkMan?id='+this.data.selectlink.id+'&custId='+this.data.custId;
     dd.navigateTo({ url: page });
  },
  //添加跟进
  addfollow(e){
    var detail=e.currentTarget.dataset;
    var url='?custId='+this.data.customer.custId+'&custName='+this.data.customer.custName+'&classId='+this.data.customer.classId;
    url+='&linkMan='+detail.linkMan+'&tel='+detail.tel;
    const page = '../../follow/addfollow/addfollow'+url;
    dd.navigateTo({ url: page });
  },
  checkfollow(e){
    const page = '../../follow/followinfo/followinfo?id='+e.currentTarget.dataset.id;
    dd.navigateTo({ url: page });
  },
  cellphone(e){
    var telnumber=e.currentTarget.dataset.tel;
    if(telnumber.length>0)
    {
      if(telnumber.indexOf('-')>-1)
      {
        telnumber=telnumber.split('-')[1];
      }
      app.telto(telnumber);
    }
  },
  setsource(source){
    var that=this;
    ajaxInti.InitSource(that,app,function(resultdata){
      var linsData=[];
      var selectindex=[0];
      var seltext="";
      for(var i=0;i<resultdata.data.length;i++)
      {
          linsData.push({text:resultdata.data[i].title,value:resultdata.data[i].id})
          if(resultdata.data[i].id==source)
          {
              selectindex=[i];
              seltext=linsData[selectindex[0]].text
          }
      }
      that.setData({
          "customer.source":seltext
      });
    });
  }
});
