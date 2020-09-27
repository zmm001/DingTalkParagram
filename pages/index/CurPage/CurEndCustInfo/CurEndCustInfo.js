import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    CustList:{
      curPage:1,
      PageCount:1,
      oncheck:"curDetail",
      active:true,
      loadtext:"正在加载...",
      data:[]
    },
    channelId:'',
    Issearchbtn:false,
    searchtext:''
  },
  onLoad(request) {
    if(request.id!=null&&request.id.length>0)
    {
      this.setData({
        channelId:request.id,
        "CustList.data":[]
      })
      this.getCustList();
    }
    this.setData({
      scrollheight: app.sysinfo.windowHeight-60
    });
    this.blurchange();
  },
  getCustList:function(){
    if(this.data.CustList.curPage<=this.data.CustList.PageCount)
    {
      var param={
				custName: this.data.searchtext,
        firmId: app.userinfo.firmId,
        channelId: this.data.channelId,
        page: this.data.CustList.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.EndCustList,param,function(resultlist){
          var linsData=that.data.CustList.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              var updateDatestring =dataJson[i].updateDate.substring(5,dataJson[i].updateDate.length);
              linsData.push(
                {
                  custId:dataJson[i].id,
                  custName:dataJson[i].custName,
                  provinceId:dataJson[i].provinceId,
                  province:dataJson[i].province,
                  cityId:dataJson[i].cityId,
                  city:dataJson[i].city,
                  countyId:dataJson[i].countyId,
                  county:dataJson[i].county,
                  address:dataJson[i].address,
                  classId:dataJson[i].classId,
                  typeName:dataJson[i].typeName,
                  ownUser:dataJson[i].ownUser,
                  updateDate:dataJson[i].updateDate,
                  updateDatestring:updateDatestring,
                });
          };
          that.setData({
            "CustList.data":linsData,
            "CustList.curPage":curPage+1,
            "CustList.PageCount":PageCount
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
            "CustList.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "CustList.loadtext":'没有更多数据...'
        });
    }
  },
  //往上拉加载
  scroll:function(e){
     if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "CustList.loadtext":'正在加载...',
      });
      //底部
      this.getCustList();
    } 
  },
  //刷新
  refreshre:function(e){
    //顶部
    this.setData({
      "CustList.curPage":1,
      "CustList.loadtext":'刷新数据中...',
      "CustList.data":[]
    });
    this.getCustList();
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
      "backparam.endCustId":e.currentTarget.dataset.custId,
      "backparam.endCustName":e.currentTarget.dataset.custName
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
