import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp();

Page({
  data: {
    model:{
      title:'',
      projectNo: '',
      custId: '',
      custName: '',
      classId: '',
      endCustId: '',
      endCustName: '',
      linkMan: '',
      linkWay: '',
      endLinkMan: '',
      endLinkWay: '',
      userId: '',
      projectState: '',
      projectType: '',
      estimateDate: '',
      estimatePrice: '',
      requirement: '',
      filePath:'',
      remark:''
    },
    productlist:{
      data:[]
    },
    followlist:{
      data:[],
      oncheck:"checkfollow"
    },
    images:{
      showimage:"showimage",
      data:[]
    },
    projectid:'',
    userid:'',
    isEdit:false//修改权限
  },
  onLoad(request) {
    if(request.id!=null)
    {
      this.setData({
        projectid:request.id
      });
    }
  },
  onReady(){
    dd.createSelectorQuery()
      .selectAll(".savespan").boundingClientRect()
      .exec((ret)=>{
        my.getSystemInfo({
          success: (res) => {
            this.setData({
              width: res.windowWidth-60-15-10-10
            });
          }
        });
      });
  },
  onShow(){
    this.getprojectinfo();
  },
  getprojectinfo:function(){
    var param={
    firmId: app.userinfo.firmId,
    projectId: this.data.projectid
    };
    var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.GetProjectDetails,param,function(result){
      var detail=result.data.project;
      var estimateDate=(app.vnull(detail.estimateDate)?app.timeobjecttostring(new Date(detail.estimateDate)):'')
      that.setData({
        "model.title":detail.title,
        "model.projectNo": detail.projectNo,
        "model.custId": detail.custId,
        "model.custName": detail.custName,
        "model.classId": detail.classId,
        "model.endCustId": detail.endCustId,
        "model.endCustName": detail.endCustName,
        "model.linkMan": detail.linkMan,
        "model.linkWay": detail.linkWay,
        "model.endLinkMan": detail.endLinkMan,
        "model.endLinkWay": detail.endLinkWay,
        "model.fullName": detail.fullName,
        "model.projectState": detail.projectState,
        "model.projectStateName":app.getFollowupWay(detail.projectState).title,
        "model.projectType": detail.projectType,
        "model.projectTypeName":app.getprojectType(detail.projectType),
        "model.estimateDate": estimateDate,
        "model.estimatePrice": detail.estimatePrice,
        "model.requirement": detail.requirement,
        "model.filePath":detail.filePath,
        "model.remark":detail.remark,
        "model.partakeUser":detail.partakeUser
      });
      var linsData=[];
      var dataJson=result.data.proList;
      for(var i=0;i<dataJson.length;i++)
      {
          linsData.push(
            {
              "id":dataJson[i].id,
              "productId":dataJson[i].productId,
              "unit":dataJson[i].unit,
              "singlePrice":dataJson[i].singlePrice,
              "issn":dataJson[i].issn,
              "brandName":dataJson[i].brandName,
              "serviceLife":dataJson[i].serviceLife,
              "productName":dataJson[i].productName,
              "productModel":dataJson[i].productModel,
              "productNum":dataJson[i].productNum,
              "minPrice":(parseFloat(dataJson[i].singlePrice)*dataJson[i].productNum).toFixed(2)
            });
      };
      that.setData({
        "productlist.data":linsData
      })
      if(app.vnull(detail.filePath))
      {
        var photos=(app.vnull(detail.filePath)?detail.filePath.split('$'):[]);
        var images=[];
        for(var i=0;i<photos.length;i++)
        {
          images.push({url:photos[i]});
        }
        that.setData({
          images:images
        });
      }
      if(detail.userId==app.getuserinfo().uid)
      {
        that.setData({
          isEdit:true
        });
      }
      that.getfollowlist();
    });
  },
  getfollowlist:function(){
    var param={
      firmId: app.userinfo.firmId,
      objId: app.followObjType.project,
      objType: this.data.projectid
    };
    var that=this;
    ajaxInti.InitPageList(that,app,app.APIURL.GetListByObjId,param,function(resultlist){
        var linsData=[];
        var dataJson=resultlist.data;
        for(var i=0;i<dataJson.length;i++)
        {
            linsData.push(
              {
                id:dataJson[i].id,
                fullName:dataJson[i].fullName,
                content:dataJson[i].content,
                linkDate:dataJson[i].linkDate,
                icon:app.getusericon(dataJson[i].userId)
              });
        };
        that.setData({
          "followlist.data":linsData
        });
    });
  },
  checkfollow:function(e){
    const page = '../../follow/followinfo/followinfo?id='+e.currentTarget.dataset.id;
    dd.navigateTo({ url: page });
  },
  showimage:function(e){
    var images=this.data.images.data;
    var selecturl=e.currentTarget.dataset.url;
    app.showimage(selecturl,images);
  }
});
