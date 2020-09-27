import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()

Page({
  data: {
    project:{
      data:{
          firmId: '',
					id: '',
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
					fullName: '',
					createUser: '',
					typeId: '',
					projectState: '',
					projectType: '',
					province: '',
					provinceId: '',
					city: '',
					cityId:'',
					county: '',
					countyId: '',
					estimateDate: '',
					estimatePrice: '',
					requirement: '',
					industryId: '',
					industry: '',
					filePath:'',
					remark:''
      },
      json: [],
      editIds:'',
      delIds: ''
    },
    images:{
      showimage:"showimage",
      delchange:"delchange",
      data:[]
    },
    backparam:{
      custId:'',
      custName:'',
      classId:1,
      linkMan:'',
      endLinkMan:'',
      tel:'',
      endTel:'',
      endCustId:'',
      endCustName:''
    },
    projectstate:{
      isShow:false,
      val:[0],
      lastval:[0],
      data:[]
    },
    ProjectType:{
      isShow:false,
      val:[0],
      lastval:[0],
      data:[]
    },
    productlist:{
      editchange:"editchange",
      delchange:"delchange",
      data:[]
    },
    backsetParam:{
      userList:[],
      type:'',
      mainUser:[],
      partakeUser:[]
    }
  },
  onLoad(request) {
    this.setData({
      "project.data.title":"",
      "images.data":[]
    });
    var ProjectStateCache=dd.getStorageSync({ key: "ProjectStateCache" });
    var projectTypeCache=dd.getStorageSync({ key: "projectTypeCache" });
      
    this.getprojectstate(ProjectStateCache);
    this.getprojectType(projectTypeCache);
    if(app.vnull(request.id))
    {
      this.setData({
        projectid:request.id
      });
      this.getprojectinfo();
    }
  },
  onShow(){
    if(app.vnull(this.data.backparam.custId))
    {
      if(app.vnull(this.data.project.data.custId)&&this.data.project.data.custId!=this.data.backparam.custId)
      {
        //改变客户则直接将客户联系人和渠道客户及渠道客户联系人全部初始化
        this.setData({
          "project.data.linkMan":'',
          "project.data.tel":'',
          "project.data.endCustId":'',
          "project.data.endCustName":'',
          "project.data.endLinkMan":'',
          "project.data.endTel":'',
          "backparam.linkMan":'',
          "backparam.tel":'',
          "backparam.endCustId":'',
          "backparam.endCustName":'',
          "backparam.endLinkMan":'',
          "backparam.endTel":'',
          "backparam.province":'',
          "backparam.provinceId":'',
          "backparam.city":'',
          "backparam.cityId":'',
          "backparam.county":'',
          "backparam.countyId":''
        });
      }
      this.setData({
        "project.data.custId":this.data.backparam.custId,
        "project.data.custName":this.data.backparam.custName,
        "project.data.classId":this.data.backparam.classId,
        "project.data.province":this.data.backparam.province,
        "project.data.provinceId":this.data.backparam.provinceId,
        "project.data.city":this.data.backparam.city,
        "project.data.cityId":this.data.backparam.cityId,
        "project.data.county":this.data.backparam.county,
        "project.data.countyId":this.data.backparam.countyId
      });
       
    }
    if(app.vnull(this.data.backparam.endCustId))
    {
      if(app.vnull(this.data.project.data.endCustId)&&this.data.project.data.endCustId!=this.data.backparam.endCustId)
      {
        //改变渠道客户则直接将道渠客户联系人全部初始化
        this.setData({
          "project.data.endLinkMan":'',
          "project.data.endTel":'',
          "backparam.endLinkMan":'',
          "backparam.endTel":'',
          "backparam.province":'',
          "backparam.provinceId":'',
          "backparam.city":'',
          "backparam.cityId":'',
          "backparam.county":'',
          "backparam.countyId":''
        });
      }
      this.setData({
        "project.data.endCustId":this.data.backparam.endCustId,
        "project.data.endCustName":this.data.backparam.endCustName,
        "project.data.province":this.data.backparam.province,
        "project.data.provinceId":this.data.backparam.provinceId,
        "project.data.city":this.data.backparam.city,
        "project.data.cityId":this.data.backparam.cityId,
        "project.data.county":this.data.backparam.county,
        "project.data.countyId":this.data.backparam.countyId
      });
     
    }
    if(app.vnull(this.data.backparam.linkMan))
    {
      this.setData({
        "project.data.linkMan":this.data.backparam.linkMan,
        "project.data.tel":this.data.backparam.tel
      });
    }
    if(app.vnull(this.data.backparam.endLinkMan))
    {
      this.setData({
        "project.data.endLinkMan":this.data.backparam.endLinkMan,
        "project.data.endTel":this.data.backparam.endLinkWay
      });
    }   
    if(app.vnull(this.data.backparam.projectId))
    {
      this.setData({
        "project.data.objId":this.data.backparam.projectId,
        "project.data.projectName":this.data.backparam.projectName,
        "project.data.objType":app.followObjType.project
      });
    }
    if(app.vnull(this.data.backsetParam.type))
    {
      //这里type不为空的情况为选择了人员数据
      if(this.data.backsetParam.type=="mainUser")
      {
        this.setData({
          "backsetParam.mainUser":this.data.backsetParam.userList,
          "project.data.userId":this.data.backsetParam.userList[0].userId,
          "project.data.fullName":this.data.backsetParam.userList[0].Name
        });
      }
      else if(this.data.backsetParam.type=="partakeUser")
      {
        var seluserId="";
        var seluser="";
        for(var i=0;i<this.data.backsetParam.userList.length;i++)
        {
            seluserId+=this.data.backsetParam.userList[i].userId+',';
            seluser+=this.data.backsetParam.userList[i].Name+',';
        }
        if(app.vnull(seluserId))
        {
            seluserId=seluserId.substring(0,seluserId.length-1);
            seluser=seluser.substring(0,seluser.length-1);
        }
        this.setData({
          "backsetParam.partakeUser":this.data.backsetParam.userList,
          "project.data.partakeUserId":seluserId,
          "project.data.partakeUser":seluser
        });
      }
    }
  },
  //获取实体
  getprojectinfo:function(){
    var param={
    firmId: app.userinfo.firmId,
    projectId: this.data.projectid
    };
    var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.GetProjectDetails,param,function(result){
      var detail=result.data.project;
      var estimateDate=(detail.estimateDate==null?'':app.timeobjecttostring(new Date(detail.estimateDate)))
      that.setData({
          "project.data.firmId": detail.firmId,
					"project.data.id": detail.id,
					"project.data.title":detail.title,
					"project.data.projectNo": detail.projectNo,
					"project.data.custId": detail.custId,
					"project.data.custName":detail.custName,
					"project.data.classId": detail.classId,
					"project.data.endCustId": detail.endCustId,
					"project.data.endCustName": detail.endCustName,
					"project.data.linkMan":detail.linkMan,
					"project.data.linkWay":detail.linkWay,
					"project.data.endLinkMan": detail.endLinkMan,
					"project.data.endLinkWay": detail.endLinkWay,
					"project.data.userId": detail.userId,
					"project.data.fullName": detail.fullName,
					"project.data.createUser": detail.createUser,
					"project.data.typeId":  detail.typeId,
					"project.data.projectState": detail.projectState,
					"project.data.projectStateName": app.getFollowupWay(detail.projectState).title,
					"project.data.projectType": detail.projectType,
					"project.data.projectTypeName": app.getprojectType(detail.projectType),
					"project.data.province": detail.province,
					"project.data.provinceId": detail.provinceId,
					"project.data.city": detail.city,
					"project.data.cityId":detail.cityId,
					"project.data.county": detail.county,
					"project.data.countyId": detail.countyId,
					"project.data.estimateDate":estimateDate,
					"project.data.estimatePrice": detail.estimatePrice,
					"project.data.requirement":detail.requirement,
					"project.data.industryId": detail.industryId,
					"project.data.industry": detail.industry,
					"project.data.filePath":detail.filePath,
					"project.data.remark":detail.remark,
          "project.data.partakeUser":detail.partakeUser,
          "project.data.partakeUserId":detail.partakeUserId
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
      });
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
    });
  },
  selectfollowDate:function(e){
    var estimateDate=this.data.project.data.estimateDate;
    var modelnode=e.currentTarget.dataset.modelnode;
    var that=this;
    app.datepicker(estimateDate,that,function(datestring){
      var data={};
      switch(modelnode)
      {
        case "project.data.estimateDate":
        data={"project.data.estimateDate":datestring};
        break;
      }
      that.setData(data);
    });
  },
  //文本变换赋给实体值
  getinputvalue:function(e){
   var name= e.currentTarget.dataset.name;
   var value=e.detail.value;
   var data=this.data.project.data;
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
  },
  getprojectstate:function(ProjectStateCache){
    var linsData=[];
    for(var i=0;i<ProjectStateCache.data.length;i++)
    {
      linsData.push({text:ProjectStateCache.data[i].title,value:ProjectStateCache.data[i].code});
    }
    this.setData({
      "projectstate.data":linsData
    });
  },
  closexs:function(){
    this.setData({
      "projectstate.isShow":!this.data.projectstate.isShow,
      "projectstate.val":this.data.projectstate.lastval
    });
  },
  openxs:function(){
    this.setData({
      "projectstate.isShow":!this.data.projectstate.isShow
    });
    if(this.data.projectstate.isShow==false)
    {
      var projectstate= this.data.projectstate;
      if(projectstate.data[projectstate.val[0]].value!="")
      {
        this.setData({
          "project.data.projectState":projectstate.data[projectstate.val[0]].value,
          "project.data.projectStateName":projectstate.data[projectstate.val[0]].text
        });
      }
    }
  },
  projectstateChange:function(e){
    let val=e.detail.value;
    var selval=this.data.projectstate.val;
    if(val[0]!=selval[0])
    {
        this.setData({
          "projectstate.val":val,
        });
    }
  },
  getprojectType:function(ProjectTypeCache){
    var linsData=[];
    for(var i=0;i<ProjectTypeCache.data.length;i++)
    {
      linsData.push({text:ProjectTypeCache.data[i].title,value:ProjectTypeCache.data[i].code});
    }
    this.setData({
      "ProjectType.data":linsData
    });
  },
  closetype:function(){
    this.setData({
      "ProjectType.isShow":!this.data.ProjectType.isShow,
      "ProjectType.val":this.data.ProjectType.lastval
    });
  },
  opentype:function(){
    this.setData({
      "ProjectType.isShow":!this.data.ProjectType.isShow
    });
    if(this.data.ProjectType.isShow==false)
    {
      var ProjectType= this.data.ProjectType;
      if(ProjectType.data[ProjectType.val[0]].value!="")
      {
        this.setData({
          "project.data.projectType":ProjectType.data[ProjectType.val[0]].value,
          "project.data.projectTypeName":ProjectType.data[ProjectType.val[0]].text
        });
      }
    }
  },
  ProjectTypeChange:function(e){
    let val=e.detail.value;
    var selval=this.data.ProjectType.val;
    if(val[0]!=selval[0])
    {
        this.setData({
          "ProjectType.val":val,
        });
    }
  },
  //选择客户
  openCustList:function(e){
    const page = '../../CurPage/CurCustInfo/CurCustInfo';
    dd.navigateTo({ url: page });
  },
  //选择最终客户
  openendCustList:function(e){
     var channelId=this.data.project.data.custId;
     if(channelId!=null&&channelId.length>0)
     {
      const page = '../../CurPage/CurEndCustInfo/CurEndCustInfo?id='+channelId;
      dd.navigateTo({ url: page });
     }
  },
  //选择客户联系人
  openlinkList:function(e){
    var CustId=this.data.project.data.custId; var CustId=this.data.project.data.custId;
    if(CustId!=null&&CustId.length>0)
    {
     const page = '../../CurPage/CurLinkMan/CurLinkMan?id='+CustId+'&EndPreson=false';
     dd.navigateTo({ url: page });
    }
    else{
     dd.alert({content:"请先选择客户或渠道"});
    }
  },
  //选择最终客户联系人
  openendlinkList:function(e){
     const page = '../../CurPage/CurLinkMan/CurLinkMan?id='+this.data.project.data.endCustId+'&EndPreson=true';
     dd.navigateTo({ url: page });
  },
  selectproduct:function(){
     const page = '../../CurPage/CurProductInfo/CurProductInfo';
     dd.navigateTo({ url: page });
  },
  editchange:function(e){
    var model=e.currentTarget.dataset;
    var url= app.JsonToData(model);
    const page = '../../CurPage/CurProductInfo/CurProductInfo?'+url;
    dd.navigateTo({ url: page });
  },
  delchange:function(e){
    var deleteid=e.currentTarget.dataset.productId;
    var id=e.currentTarget.dataset.id;
    var that=this;
    dd.confirm({
      content:'是否删除该产品?' ,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm)
        {
          delete that.data.productlist.data[that.getdataindex(deleteid)]
          that.data.productlist.data.length=that.data.productlist.data.length-1;
          that.setData({
            "productlist.data":that.data.productlist.data
          });
          var delIds= that.data.project.delIds;
          if(app.vnull(delIds))
          {
            delIds+=",";
          }
          if(app.vnull(id))
          {
            that.setData({
              "project.delIds":delIds+deleteid
            });
          }
        }
      },
    });
  },
  getdataindex:function(deleteid){
    var deleteIndex=0;
    var data= this.data.productlist.data;
    for(var i;i<data.length;i++)
    {
        if(data[i].productId==deleteid)
        {
          deleteIndex=index;
          break;
        }
    }
    return deleteIndex;
  },
  //选择负责人
  openmainUserLi:function(e){
    const page = '../../CurPage/selectUserAll/selectUserAll?IsMulti=0&type=mainUser&userId='+this.data.project.data.userId+'&Name='+this.data.project.data.fullName;
    dd.navigateTo({ url: page });
  },
  //选择参与人
  partakeUserLi:function(e){
    const page = '../../CurPage/selectUserAll/selectUserAll?IsMulti=1&type=partakeUser&userId='+this.data.project.data.partakeUserId+'&Name='+this.data.project.data.partakeUserId;
    dd.navigateTo({ url: page });
  },
  //保存
  submitsave:function(e){
    var flag=app.valueVerification(this.data.project.data.title,null,null,null,"请填写商机名称（1~200）")
    if(flag)
    {
      flag=app.valueVerification(this.data.project.data.custId,null,null,null,"选择客户名称")
    }
    if(flag){
      if(app.vnull(this.data.project.data.endCustId))
      {
        flag=app.valueVerification(this.data.project.data.endLinkMan,null,null,null,"选择联系人")
      }else{
        flag=app.valueVerification(this.data.project.data.linkMan,null,null,null,"选择联系人")
      }
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.project.data.estimatePrice,null,null,null,"请填写预计销售金额")
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.project.data.estimateDate,null,null,null,"请选择预计成交时间")
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.project.data.projectState,null,null,null,"请选择商机状态")
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.project.data.projectType,null,null,null,"请选择商机分类")
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.project.data.requirement,null,null,null,"请填写客户需求0~1000")
    }
    // if(flag)
    // {
    //     flag=app.valueVerification(this.data.project.data.longitude,null,null,null,"请重新定位");
    // }
    if(flag)
    {
      this.setData({
        "project.data.firmId":app.getuserinfo().firmId,
        // "project.data.fullName":app.getuserinfo().fullName,
        "project.data.createUser":app.getuserinfo().fullName,
        // "project.data.userId":app.getuserinfo().uid,
        "project.filePath":app.getimgaestring(this.data.images.data),
        "project.json":JSON.stringify(this.data.productlist.data)
      });
      if(!app.vnull(this.data.project.data.id))
      {
        this.setData({
          "project.editIds":"",
          "project.delIds":""
        })
      }
      var param_info=this.data.project;
      var params=app.JsonToData(param_info);
      ajaxInti.InitSubmitPage(this,app,app.APIURL.SaveProjectV2,params,function(result){
          var pages=getCurrentPages();
          pages[pages.length-2].setData({
              refreshre:true
          });
          dd.navigateBack({
          delta: 1
          })
      })
    }
  },
  showimage:function(e){
    var images=this.data.images.data;
    var selecturl=e.currentTarget.dataset.url;
    app.showimage(selecturl,images);
  },
  fileupload:function(){
    app.fileUpload(10,this,"follow");
  },
  delchange:function(e){
    var images=this.data.images.data;
    var selecturl=e.currentTarget.dataset.url;
    app.delimages(selecturl,images,this);
  }
});
