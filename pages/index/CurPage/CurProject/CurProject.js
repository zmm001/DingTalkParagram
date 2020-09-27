import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
      ProjectList:{
      curPage:1,
      PageCount:1,
      oncheck:"curDetail",
      active:true,
      loadtext:"正在加载...",
      data:[]
    },
    Issearchbtn:false,
    searchtext:''
  },
  onLoad(request) {
    this.setData({
      "ProjectList.data":[]
    });
    if(app.vnull(request.id))
    {
       this.setData({
          "custId":request.id
        });
    }
    ajaxInti.InitProjectState(this,app);
    this.setData({
      scrollheight: app.sysinfo.windowHeight-60
    });
    this.blurchange();
  },
  onShow(){
    this.getProjectList();
  },
  getProjectList:function(){
    if(this.data.ProjectList.curPage<=this.data.ProjectList.PageCount)
    {
      var param={
				keyword: this.data.searchtext,
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        partnerFilter: 1,
        custId: this.data.custId,
        page: this.data.ProjectList.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.UsingProjectList,param,function(resultlist){
          var linsData=that.data.ProjectList.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              linsData.push(
                {
                  projectId:dataJson[i].id,
                  projectName:dataJson[i].title,
                  projectNo:dataJson[i].projectNo,
                  createUser:dataJson[i].createUser,
                  projectState:dataJson[i].projectState,
                  projectStatetext:app.getstatetext(dataJson[i].projectState),
                  estimatePrice:dataJson[i].estimatePrice,
                  provinceId:dataJson[i].provinceId,
                  province:dataJson[i].province,
                  cityId:dataJson[i].cityId,
                  city:dataJson[i].city,
                  countyId:dataJson[i].countyId,
                  county:dataJson[i].county,
                  custName:dataJson[i].custName,
                  classId:dataJson[i].classId,
                  linkman:dataJson[i].linkMan,
                  tel:dataJson[i].tel,
                  endLinkMan:dataJson[i].endLinkMan,
                  endLinkWay:dataJson[i].endLinkWay
                });
          };
          that.setData({
            "ProjectList.data":linsData,
            "ProjectList.curPage":curPage+1,
            "ProjectList.PageCount":PageCount
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
            "ProjectList.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "ProjectList.loadtext":'没有更多数据...'
        });
    }
  },
  //往上拉加载
  scroll:function(e){
     if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "ProjectList.loadtext":'正在加载...',
      });
      //底部
      this.getProjectList();
    } 
  },
  //刷新
  refreshre:function(e){
    //顶部
    this.setData({
      "ProjectList.curPage":1,
      "ProjectList.loadtext":'刷新数据中...',
      "ProjectList.data":[]
    });
    this.getProjectList();
  },
  search:function(e){
    this.setData({
      Issearchbtn:false
    });
    this.refreshre();
  },
  searchchange:function(e){
     this.setData({
      searchtext:e.detail.value,
     });
  },
  //选择一个客户返回参数
  curDetail:function(e){
   
    var pages=getCurrentPages();
    pages[pages.length-2].setData({
      "backparam.projectId":e.currentTarget.dataset.projectId,
      "backparam.projectName":e.currentTarget.dataset.projectName,
      "backparam.projectNo":e.currentTarget.dataset.projectNo,
      "backparam.linkman":e.currentTarget.dataset.linkman,
      "backparam.tel":e.currentTarget.dataset.tel,
      "backparam.endLinkMan":e.currentTarget.dataset.endLinkMan,
      "backparam.endLinkWay":e.currentTarget.dataset.endLinkWay,
      "backparam.linkWay":e.currentTarget.dataset.linkWay,
      "backparam.linkWayName":e.currentTarget.dataset.linkWayName
    })
    dd.navigateBack({
    delta: 1
    });
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
  }
});
