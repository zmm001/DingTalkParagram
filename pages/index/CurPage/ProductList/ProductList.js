import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    ProductList:{
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
  onLoad() {
    this.setData({
      "ProductList.data":[]
    });
    this.getProductList();
    this.setData({
      scrollheight: app.sysinfo.windowHeight-60
    });
    this.blurchange();
  },
  getProductList:function(){
    if(this.data.ProductList.curPage<=this.data.ProductList.PageCount)
    {
      var param={
				word: this.data.word,
        firmId: app.userinfo.firmId,
        page: this.data.ProductList.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.ProductList,param,function(resultlist){
          var linsData=that.data.ProductList.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              linsData.push(
                {
                  productId:dataJson[i].id,
                  unit:dataJson[i].unit,
                  price:dataJson[i].retailPrice,
                  issn:dataJson[i].isSN,
                  brandName:dataJson[i].brandName,
                  serviceLife:dataJson[i].serviceLife,
                  productName:dataJson[i].productName,
                  productModel:dataJson[i].productModel,
                  brandName:dataJson[i].brandName
                });
          };
          that.setData({
            "ProductList.data":linsData,
            "ProductList.curPage":curPage+1,
            "ProductList.PageCount":PageCount
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
            "ProductList.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "ProductList.loadtext":'没有更多数据...'
        });
    }
  },
  //往上拉加载
  scroll:function(e){
     if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "ProductList.loadtext":'正在加载...',
      });
      //底部
      this.getProductList();
    } 
  },
  //刷新
  refreshre:function(e){
    //顶部
    this.setData({
      "ProductList.curPage":1,
      "ProductList.loadtext":'刷新数据中...',
      "ProductList.data":[]
    });
    this.getProductList();
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
      "model.productId":e.currentTarget.dataset.productId,
      "model.unit":e.currentTarget.dataset.unit,
      "model.price":e.currentTarget.dataset.price,
      "model.issn":e.currentTarget.dataset.issn,
      "model.brandName":e.currentTarget.dataset.brandName,
      "model.serviceLife":e.currentTarget.dataset.serviceLife,
      "model.productName":e.currentTarget.dataset.productName,
      "model.productModel":e.currentTarget.dataset.productModel,
      "model.productNum":0
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
