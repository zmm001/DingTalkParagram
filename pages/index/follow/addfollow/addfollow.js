import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()

Page({
  data: {
    model:{
      custId: '',
			custName: '',
			linkMan: '',
			tel: '',
			endLinkMan: '',
			endTel: '',
			linkWay: '',
      linkWayName:'',
			linkDate: '',
			content: '',
			userId:'',
			fullName: '',
			firmId: '',
			objType: '',
			objId: '',
			photo: '',
			longitude: '',
			latitude: '',
			mobileAddress: '',
			isDiary: 1,
			endCustId: '',
			endCustName: '',
			classId: '',
			State: '',
			fpid:'',
			fplinkDate:'',
			fpcontent:'',
      projectName:'',
      isfollowplan:false
    },
    linkway:{
      isShow:false,
      value:[0],
      lastvalue:[0],
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
    images:{
      showimage:"showimage",
      delchange:"delchange",
      data:[]
    },
    plan:false
  },
  onLoad(request) {
    ajaxInti.IntiLinkWayList(this,app);
    var plan=false;
    if(app.vnull(request.plan))
    {
      plan=true;
    }
    this.setData({
      "model.objType":app.followObjType.cust,
      "model.linkDate":app.timeobjecttostring(new Date(),"YYYY-MM-dd"),
      "images.data":[],
      "model.isfollowplan":plan
    });
    if(request.id!=null&&request.id.length>0)
    {
      this.setData({
        followid:request.id,
        "backparam.custId":'',
        "backparam.custName":'',
        "backparam.classId":1,
        "backparam.linkMan":'',
        "backparam.endLinkMan":'',
        "backparam.tel":'',
        "backparam.endTel":'',
        "backparam.endCustId":'',
        "backparam.endCustName":''
      });
      this.getfolloinfo();
    }
    else if(app.vnull(request.linkWay))
    {
      this.setData({
        "backparam.custId":request.custId,
        "backparam.custName":request.custName,
        "backparam.classId":request.classId,
        "backparam.linkMan":request.linkMan,
        "backparam.endLinkMan":request.endLinkMan,
        "backparam.tel":request.linkWay,
        "backparam.endTel":request.endLinkWay,
        "backparam.endCustId":request.endCustId,
        "backparam.endCustName":request.endCustName,
        "backparam.linkWayName":request.linkWayName,
        "backparam.linkWay":request.linkWay,
        "backparam.projectId":request.projectId,
        "backparam.projectName":request.projectName
      });
    }
    else if(request.linkMan!=null)
    {
      this.setData({
        "model.custId":request.custId,
        "model.custName":request.custName,
        "model.classId":request.classId,
        "model.linkMan":request.linkMan,
        "model.tel":request.tel
      });
    }
    else if(request.custId!=null&&request.custId.length>0)
    {
      this.setData({
        "model.custId":request.custId,
        "model.custName":request.custName,
        "model.classId":request.classId
      });
    }
    this.getlocation();
  },
  onShow(){
    if(app.vnull(this.data.backparam.custId))
    {
      if(app.vnull(this.data.model.custId)&&this.data.model.custId!=this.data.backparam.custId)
      {
        //改变客户则直接将客户联系人和渠道客户及渠道客户联系人全部初始化
        this.setData({
          "model.linkMan":'',
          "model.tel":'',
          "model.endCustId":'',
          "model.endCustName":'',
          "model.endLinkMan":'',
          "model.endTel":'',
          "backparam.linkMan":'',
          "backparam.tel":'',
          "backparam.endCustId":'',
          "backparam.endCustName":'',
          "backparam.endLinkMan":'',
          "backparam.endTel":''
        });
      }
      this.setData({
        "model.custId":this.data.backparam.custId,
        "model.custName":this.data.backparam.custName,
        "model.classId":this.data.backparam.classId
      });
       
    }
    if(app.vnull(this.data.backparam.endCustId))
    {
      if(app.vnull(this.data.model.endCustId)&&this.data.model.endCustId!=this.data.backparam.endCustId)
      {
        //改变渠道客户则直接将道渠客户联系人全部初始化
        this.setData({
          "model.endLinkMan":'',
          "model.endTel":'',
          "backparam.endLinkMan":'',
          "backparam.endTel":''
        });
      }
      this.setData({
        "model.endCustId":this.data.backparam.endCustId,
        "model.endCustName":this.data.backparam.endCustName
      });
     
    }
    if(app.vnull(this.data.backparam.linkMan))
    {
      this.setData({
        "model.linkMan":this.data.backparam.linkMan,
        "model.tel":this.data.backparam.tel
      });
    }
    if(app.vnull(this.data.backparam.endLinkMan))
    {
      this.setData({
        "model.endLinkMan":this.data.backparam.endLinkMan,
        "model.endTel":this.data.backparam.endLinkWay
      });
    }   
    if(app.vnull(this.data.backparam.projectId))
    {
      this.setData({
        "model.objId":this.data.backparam.projectId,
        "model.projectName":this.data.backparam.projectName,
        "model.objType":app.followObjType.project
      });
    }
    if(app.vnull(this.data.backparam.linkWay))
    {
       this.setData({
        "model.linkWay":this.data.backparam.linkWay,
        "model.linkWayName":app.getFollowupWay(this.data.backparam.linkWay).title,
        "linkway.value":[app.getFollowupWay(this.data.backparam.linkWay).index],
        "linkway.lastvalue":[app.getFollowupWay(this.data.backparam.linkWay).index]
       });
    }
  },
  //获取实体
  getfolloinfo:function(){
    var param={
    firmId: app.userinfo.firmId,
    id: this.data.followid
    };
    var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.GetFollowupDetails,param,function(result){
      var detail=result.data;
      var fplinkDate=(!app.vnull(detail.fpLinkDate)?'':app.timeobjecttostring(new Date(detail.fpLinkDate)))
      that.setData({
        "model.id":that.data.followid,
        "model.custId": detail.custId,
        "model.custName": detail.custName,
        "model.linkMan": detail.linkMan,
        "model.tel": detail.tel,
        "model.endLinkMan":detail.endLinkMan,
        "model.endTel": detail.endTel,
        "model.linkWay": detail.linkWay,
        "model.linkWayName": app.getFollowupWay(detail.linkWay).title,
        "model.linkDate": app.timeobjecttostring(new Date(detail.linkDate)),
        "model.content": detail.content,
        "model.userId":detail.userId,
        "model.fullName":detail.fullName,
        "model.objType": detail.objType,
        "model.objId": detail.objId,
        "model.photo": detail.photo,
        "model.longitude": detail.longitude,
        "model.latitude": detail.latitude,
        "model.mobileAddress": detail.mobileAddress,
        "model.isDiary": detail.isDiary,
        "model.endCustId":detail.endCustId,
        "model.endCustName": detail.endCustName,
        "model.classId": detail.classId,
        "model.State": detail.projectState,
        "model.projectName":detail.projectName,
        "model.fpid": detail.planId,
        "model.fplinkDate":fplinkDate ,
        "model.fpcontent": detail.fpcontent,
        "model.createDate": app.timeobjecttostring(new Date(detail.createDate))
      });
      var photos=(app.vnull(detail.photo)?detail.photo.split('$'):[]);
      var images=[];
      for(var i=0;i<photos.length;i++)
      {
        images.push({url:photos[i]});
      }
      that.setData({
        "linkway.value":[app.getFollowupWay(detail.linkWay).index],
        "linkway.lastvalue":[app.getFollowupWay(detail.linkWay).index],
        "images.data":images
      });
    });
  },
  selectfollowDate:function(e){
    var linkDate=this.data.model.linkDate;
    var modelnode=e.currentTarget.dataset.modelnode;
    var that=this;
    app.datepicker(linkDate,that,function(datestring){
      var data={};
      switch(modelnode)
      {
        case "model.linkDate":
        data={"model.linkDate":datestring};
        break;
        case "model.fplinkDate":
        data={"model.fplinkDate":datestring};
        break;
      }
      that.setData(data);
    });
  },
  //文本变换赋给实体值
  getinputvalue:function(e){
   var name= e.currentTarget.dataset.name;
   var value=e.detail.value;
   var data=this.data.model;
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
  openlinkWay:function(){
    this.setData({
      "linkway.isShow":!this.data.linkway.isShow
    });
    if(this.data.linkway.isShow==false)
    {
      this.setData({
        "model.linkWay":this.data.linkway.data[this.data.linkway.value[0]].value,
        "model.linkWayName":this.data.linkway.data[this.data.linkway.value[0]].text,
        "linkway.lastvalue":this.data.linkway.value
      });
    }
  },
  closelinkWay:function(){
    this.setData({
      "linkway.isShow":!this.data.linkway.isShow,
      "linkway.value":this.data.linkway.lastvalue
    });
  },
  linkwayChange:function(e){
    var val=e.detail.value;
    var value=this.data.linkway.value;
    if(val[0]!=value[0])
    {
      this.setData({
        "linkway.value":[val[0]]
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
     var channelId=this.data.model.custId;
     if(channelId!=null&&channelId.length>0)
     {
      const page = '../../CurPage/CurEndCustInfo/CurEndCustInfo?id='+channelId;
      dd.navigateTo({ url: page });
     }
  },
  //选择客户联系人
  openlinkList:function(e){
    var CustId=this.data.model.custId;
    if(CustId!=null&&CustId.length>0)
    {
     const page = '../../CurPage/CurLinkMan/CurLinkMan?id='+CustId+'&EndPreson=false';
     dd.navigateTo({ url: page });
    }
    else{
     dd.alert({content:"请先选择客户或渠道"});
    }
  },
  openproject:function(e){
    var CustId=this.data.model.endCustId;
    if(!app.vnull(CustId))
    {
      CustId=this.data.model.custId
    }
     if(app.vnull(CustId))
    {
      const page = '../../CurPage/CurProject/CurProject?id='+CustId;
     dd.navigateTo({ url: page });
    }
    else{
       dd.alert({content:"请先选择客户或渠道"});
    }
  },
  //选择最终客户联系人
  openendlinkList:function(e){
     const page = '../../CurPage/CurLinkMan/CurLinkMan?id='+this.data.model.endCustId+'&EndPreson=true';
     dd.navigateTo({ url: page });
  },
  getlocation:function(){
    var that=this;
    dd.getLocation({
      type:3,
      success(res) {
        my.hideLoading();
        that.setData({
          "model.longitude":res.longitude,
          "model.latitude":res.latitude,
          "model.mobileAddress":res.address
        })
      },
      fail(err) {
        my.hideLoading();
        var errtext="网络异常，请检查网络重新定位";
        switch(err)
        {
          case 11:
          errtext="定位失败,请打开GPS!";
          break;
          case 12:
          errtext="网络异常，请检查网络重新定位";
          case 13:
          errtext="定位失败，请移步至空旷地点重试";
          case 14:
          
          break;
        }
        my.alert({ title: errtext});
      },
    })
  },
  changeDiary:function(e){
    this.setData({
      "model.isDiary":(e.detail.value==true?1:0)
    });
  },
  //保存
  submitsave:function(e){
    this.setData({
      "model.firmId":app.getuserinfo().firmId,
      "model.userId":app.getuserinfo().uid,
      "model.fullName":app.getuserinfo().fullName,
      "model.photo":app.getimgaestring(this.data.images.data)
    });
    var flag=app.valueVerification(this.data.model.custId,null,null,null,"选择客户名称")
    if(flag){
      if(app.vnull(this.data.model.endCustId))
      {
        flag=app.valueVerification(this.data.model.endLinkMan,null,null,null,"选择联系人")
      }else{
        flag=app.valueVerification(this.data.model.linkMan,null,null,null,"选择联系人")
      }
    }
    if(flag)
    {
        flag=app.valueVerification(this.data.model.linkWay,null,null,null,"选择跟进方式")
    }
    if(this.data.plan)
    {
          if(flag)
          {
              flag=app.valueVerification(this.data.model.fpcontent,null,null,null,"请填写计划跟进")
          }
          if(flag)
          {
              flag=app.valueVerification(this.data.model.fplinkDate,null,null,null,"请选择计划时间")
          }
          // if(flag)
          // {
          //     flag=app.valueVerification(this.data.model.longitude,null,null,null,"请重新定位");
          // }
    }else{
      if(flag)
      {
          flag=app.valueVerification(this.data.model.linkDate,null,null,null,"选择跟进时间")
      }
      if(flag)
      {
          flag=app.valueVerification(this.data.model.content,null,null,null,"请填写跟进记录")
      }
      if(app.vnull(this.data.model.fplinkDate))
      {
          flag=app.valueVerification(this.data.model.fpcontent,null,null,null,"请填写下次跟进记录")
      }
      if(flag)
      {
          flag=app.valueVerification(this.data.model.longitude,null,null,null,"请重新定位");
      }
    }
    
    if(flag)
    {
      var param_info=this.data.model;
      var params=app.JsonToData(param_info);
      ajaxInti.InitSubmitPage(this,app,app.APIURL.SaveFollowup,params,function(result){
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
