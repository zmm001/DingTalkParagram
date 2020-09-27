import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp();

Page({
  data: {
    model:{},
    Comment:{},
    followid:'',
    userid:'',
    plan:false,
    replyCommont:{},
    images:{
      showimage:"showimage",
      data:[]
    },
    isEdit:false//修改权限
  },
  onLoad(request) {
    if(request.id!=null)
    {
      this.setData({
        followid:request.id,
        userid:app.userinfo.uid,
        "images.data":[],
        "autowidth":app.sysinfo.windowWidth-15-70-10
      });
      if(request.plan!=null)
      {
        this.setData({
          plan:true
        });
      }
      ajaxInti.InitProjectState(this,app);
    }
    
  },
  onReady(){
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          inputwidth: res.windowWidth-75-34,
        });
      }
    });
  },
  onShow(){
    this.getfolloinfo();
  },
  getfolloinfo:function(){
    var param={
    firmId: app.userinfo.firmId,
    id: this.data.followid
    };
    var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.GetFollowupDetails,param,function(result){
      var detail=result.data;
      var fplinkDate=(app.vnull(detail.fpLinkDate)?app.timeobjecttostring(new Date(detail.fpLinkDate)):'')
      that.setData({
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
        "model.StateName": (detail.projectState.length>0?app.getstatetext(detail.projectState):""),
        "model.projectName":detail.projectName,
        "model.fpid": detail.fpid,
        "model.fplinkDate":fplinkDate ,
        "model.fpcontent": detail.fpcontent,
        "model.createDate": app.timeobjecttostring(new Date(detail.createDate)),
        "model.isDiary":detail.isDiary
      });
      var photos=(app.vnull(detail.photo)?detail.photo.split('$'):[]);
      var images=[];
      for(var i=0;i<photos.length;i++)
      {
        images.push({url:photos[i]});
      }
      that.setData({
        "images.data":images
      });
      that.getComment();
      if(detail.userId==app.getuserinfo().uid)
      {
        that.setData({
          isEdit:true
        });
      }
    });
  },
  /**
  *@获取评论列表
   */
  getComment:function(){
     var param={
        objType:app.objType.followup,
		  	objId:  this.data.followid,
        firmId: app.userinfo.firmId
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetComment,param,function(resultlist){
          var linsData=[];
          var dataJson=resultlist.data;
          for(var i=0;i<dataJson.length;i++)
          {
                linsData.push(
                {
                  replyUserId:dataJson[i].replyUserId,
                  replyUserName:dataJson[i].replyUserName,
                  fullName:dataJson[i].fullName,
                  userId:dataJson[i].userId,
                  content:dataJson[i].content,
                  icon:app.getusericon(dataJson[i].userId),
                  createDatestr:'',
                  curIndex:dataJson[i].curIndex,
                  id:dataJson[i].id
                });
          };
          that.setData({
            "Comment.data":linsData
          });
           that.setData({
              marginbottom:55
           });
          that.refreshCommentData();
      });
  },
  //设置评论实体
  setreplyCommentData:function(e){
    var model=e.currentTarget.dataset;
    //设置评论实体
    this.setData({
      'replyCommont.objType': app.objType.followup,
      'replyCommont.objId': this.data.followid,
      'replyCommont.userId': app.userinfo.uid,
      'replyCommont.fullName': app.getuserinfo().fullName,
      'replyCommont.content': '',
      'replyCommont.replyCommentId': model.replyCommentId,
      'replyCommont.firmId':app.userinfo.firmId,
      'replyCommont.replyUserId': model.replyUserId,
      'replyCommont.replyUserName': model.replyUserName,
      'replyCommont.curIndex': this.data.Comment.data.length+1,
      'replyCommont.isManage': '0',
      'replyCommont.replyIndex': model.replyIndex,
      "replyCommont.placeholder":model.placeholder
    });
  },
  //初始化评论实体
  refreshCommentData:function(){
    //设置评论实体
      this.setData({
      'replyCommont.objType': app.objType.followup,
      'replyCommont.objId': this.data.followid,
      'replyCommont.userId': app.userinfo.uid,
      'replyCommont.fullName': app.getuserinfo().fullName,
      'replyCommont.content': '',
      'replyCommont.replyCommentId': '',
      'replyCommont.firmId':app.userinfo.firmId,
      'replyCommont.replyUserId':'',
      'replyCommont.replyUserName': '',
      'replyCommont.curIndex': this.data.Comment.data.length+1,
      'replyCommont.isManage': '0',
      'replyCommont.replyIndex': 0,
      "replyCommont.placeholder":"添加评论..."
      });
      var replyCommont = this.data.replyCommont;
      replyCommont.content='';
      this.setData({
        replyCommont: replyCommont
      });
      // dd.alert({content:this.data.replyCommont.content})
  },
  /**
  *@发表评论
   */
  seedComment:function(e){
     this.setData({
       loading:"loading"
     });
     var replyCommont=this.data.replyCommont;
     delete replyCommont["images"];
      var param={
          comment:replyCommont,
					objInfo : this.data.model.linkDate,
					objUserId : this.data.model.userId
      };
      param=app.JsonToData(param);
      var that=this;
      ajaxInti.InitSubmitPage(that,app,app.APIURL.ReplyComment,param,function(resultlist){
          var linsData=that.data.Comment.data;
          var dataJson=resultlist.data;
              linsData.unshift(
                {
                  replyUserId:dataJson.replyUserId,
                  replyUserName:dataJson.replyUserName,
                  fullName:dataJson.fullName,
                  userId:dataJson.userId,
                  content:dataJson.content,
                  icon:app.getusericon(dataJson.userId),
                  createDatestr:'',
                  curIndex:dataJson.curIndex,
                  id:dataJson.id
                });
          that.setData({
            "Comment.data":linsData,
             loading:""
          });
          if(that.data.Comment.data.length>=3)
          {
           that.setData({
              marginbottom:35
           });
          }
          that.refreshCommentData();
      });
  },
  cellphone:function(e){
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
  //文本变换赋给实体值
  getinputvalue:function(e){
   var name= e.currentTarget.dataset.name;
   var value=e.detail.value;
   var data=this.data.replyCommont;
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
  showimage:function(e){
    var images=this.data.images.data;
    var selecturl=e.currentTarget.dataset.url;
    app.showimage(selecturl,images);
  },
  openmap:function(){
    dd.openLocation({
      longitude: this.data.model.longitude,
      latitude: this.data.model.latitude,
      name: '',
      address: this.data.model.mobileAddress,
    });
  }
});
