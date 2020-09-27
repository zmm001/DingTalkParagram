import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    items:[
      {
      name:'是',
      value:'1',
      checked:false
      },
      {
      name:'否',
      value:'0',
      checked:true
      },
    ],
    model:{
      id:'',
      custId: '',
      isMain: 0,
      fullName: '',
      sex: '先生',
      deptName: '',
      postName: '',
      phoneNum: '',
      tel: '',
      qq: '',
      email: '',
      birthday: '',
      firmId: ''
    },
    isShowSex:false,
    selval:[0],
    lastval:[0]
   
  },
  onLoad(request) {
    if(app.vnull(request.id))
    {
      this.setData({
        "model.id":request.id,
        "model.custId":request.custId
      });
      this.getlinkdetail();
    }
    else if(app.vnull(request.custId))
    {
      this.setData({
        "model.custId":request.custId
      });
    }
  },
  getlinkdetail(){
    var param={
        id:this.data.model.id,
        firmId: app.userinfo.firmId,
        custId: this.data.model.custId
     };
     var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.ViewLinkMan,param,function(result){
      var detail=result.data;
      that.setData({
        "model.isMain":parseInt(detail.isMain),
        "model.fullName":detail.fullName,
        "model.sex":detail.sex,
        "model.deptName":detail.deptName,
        "model.postName":detail.postName,
        "model.phoneNum":detail.phoneNum,
        "model.tel":detail.tel,
        "model.email":detail.email,
        "model.qq":detail.qq,
        "model.birthday":(app.vnull(detail.birthday)?app.timeobjecttostring(new Date(detail.birthday)):'')
      });
    });
  },
  radioChange:function(e){
    this.setData({
      "model.isMain":e.detail.value
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
  closesex:function(){
    this.setData({
      isShowSex:!this.data.isShowSex,
      selval:this.data.lastval
    });
  },
  opensex:function(){
    this.setData({
      isShowSex:!this.data.isShowSex
    });
    if(this.data.isShowSex==false){
      this.setData({
        "model.sex":this.data.selval[0]==0?"先生":"女士",
        lastval:this.data.selval
      });
    }
  },
  onChangeSex:function(e){
    var val=e.detail.value
    if(val[0]==0)
    {
      this.setData({
        selval:[0]
      });
    }else{
      this.setData({
        selval:[1]
      });
    }
  },
  openbirthday:function(e){
    var linkDate=this.data.model.birthday;
    var that=this;
    app.datepicker(linkDate,that,function(datestring){
      that.setData({"model.birthday":datestring});
    });
  },
  submitsave:function(e){
    var flag=app.valueVerification(this.data.model.fullName,null,null,null)
    if(flag){
      if(flag)
      {
        flag=app.valueVerification(this.data.model.tel,null,null,null,"手机号和电话号码必填一个");
      }
      else
      {
        flag=app.valueVerification(this.data.model.phoneNum,null,null,'tel',"抱歉，手机号码错误");
      }
    }
    if(flag)
    {
      this.setData({
        "model.firmId":app.getuserinfo().firmId
      });
      var apiurl=app.APIURL.AddSaveLinkMan;
      if(app.vnull(this.data.model.id))
      {
        apiurl=app.APIURL.EditSaveLinkMan
      }
      var param_info=this.data.model;
      var params=app.JsonToData(param_info);
      ajaxInti.InitSubmitPage(this,app,apiurl,params,function(result){
          dd.navigateBack({
          delta: 1
          })
      })
    }
  }
});
