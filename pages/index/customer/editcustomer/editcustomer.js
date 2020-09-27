import ajaxInti from '../../../CommonComponent/ajaxlist.js';
import tcity from '../../../CommonComponent/citydata-new.js';

let app = getApp()

Page({
  data: {
    custinfo:{},
    areamodel:{
      isShow:false,
      provinces: [],
      citys: [],
      countys: [],
      lastvalue:[0,0,0],
      value:[0,0,0]
    },
    custtypeList:{
      isShow:false
    },
    industryList:{
      isShow:false
    },
    sourceList:{
      isShow:false
    }
    },
  onLoad(request) {
    //  if(request.id!=null&&request.id.length>0)
    // {
      this.setData({
        "custId":request.id
      });
      tcity.init(this);
      this.getdetail();
      this.getlocation();
      
    // }
    // else{
    //   this.setData({
    //     "custId":'1a80537d5858cc73'
    //   });
    //   var that=this;
    //   tcity.init(that);
    //   that.getdetail();
    // }
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
        "custinfo.customer.id":that.data.custId,
        "custinfo.customer.firmId":app.getuserinfo().firmId,
        "custinfo.customer.ownUser":detail.ownUser,
        "custinfo.customer.custName":app.repaceallbracket(detail.custName),
        "custinfo.customer.ownUser":detail.ownUser,
        "custinfo.customer.spantext":(detail.typeName).substring(0, 2),
        "custinfo.customer.typeName":detail.typeName,
        "custinfo.customer.province":detail.province,
        "custinfo.customer.city":detail.city,
        "custinfo.customer.county":detail.county,
        "custinfo.customer.provinceId":detail.provinceId,
        "custinfo.customer.cityId":detail.cityId,
        "custinfo.customer.countyId":detail.countyId,
        "custinfo.customer.address":detail.address,
        "custinfo.customer.industry":detail.industry,
        "custinfo.customer.industryId":detail.industryId,
        "custinfo.extend.tel":extend.tel,
        "custinfo.extend.fax":extend.fax,
        "custinfo.customer.typeName":detail.typeName,
        "custinfo.customer.typeId":detail.typeId,
        "custinfo.customer.classId":detail.classId,
        "custinfo.customer.longitude":detail.longitude,
        "custinfo.customer.latitude":detail.latitude,
        "custinfo.extend.source":extend.source
      });
      that.setareaData();
      that.setcusttype();
      that.setIndustry();
      that.setsource();
    });
  },
  areamodel_open(){
    this.setData({
      "areamodel.isShow":!this.data.areamodel.isShow
    });
    if(this.data.areamodel.isShow==false)
    {
      var value=this.data.areamodel.value;
      //关闭
      this.setData({
        "custinfo.customer.province":this.data.areamodel.provinces[value[0]].text,
        "custinfo.customer.city":this.data.areamodel.citys[value[1]].text,
        "custinfo.customer.county":this.data.areamodel.countys[value[2]].text,
        "custinfo.customer.provinceId":this.data.areamodel.provinces[value[0]].value,
        "custinfo.customer.cityId":this.data.areamodel.citys[value[1]].value,
        "custinfo.customer.countyId":this.data.areamodel.countys[value[2]].value,
        "areamodel.lastvalue":value
      });
    }
  },
  areamodel_close(){
    this.setData({
      "areamodel.isShow":!this.data.areamodel.isShow
    });
    this.setareaData();
  },
  areamodel_onChange:function(e){
    let val = e.detail.value
    let t = this.data.areamodel.value;
    let cityData = this.data.cityData;
    
    if(val[0] != t[0]){
      var citys = [];
      var countys = [];
      for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
        citys.push({text:cityData[val[0]].sub[i].name,value:cityData[val[0]].sub[i].code})
      }
      if(cityData[val[0]].sub.length>0)
      {
        for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push({text:cityData[val[0]].sub[0].sub[i].name,value:cityData[val[0]].sub[0].sub[i].code})
        }
      }
      this.setData({
        "areamodel.citys":citys,
        "areamodel.countys":countys,
        "areamodel.value":val
      })
      return;
    }
    if(val[1] != t[1]){
      var countys = [];
      for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push({text:cityData[val[0]].sub[val[1]].sub[i].name,value:cityData[val[0]].sub[val[1]].sub[i].code})
      }
      this.setData({
        "areamodel.countys":countys,
        "areamodel.value":val
      })
      return;
    }
    if(val[2] != t[2]){
      this.setData({
        "areamodel.value":val
      })
      return;
    }
  },
  setareaData(){
      var that=this;
      var cityData=that.data.cityData;
      var provinces = [];
      var citys = [];
      var countys = [];
      var selectvalue=[0,0,0];
      cityData.splice(0, 1);
      for(let i=0;i<cityData.length;i++){
        provinces.push({text:cityData[i].name,value:cityData[i].code});
        if(cityData[i].code==that.data.custinfo.customer.provinceId)
        {
          selectvalue=[i,0,0];
        }
      }
      for (let i = 0 ; i < cityData[selectvalue[0]].sub.length; i++) {
          citys.push({text:cityData[selectvalue[0]].sub[i].name,value:cityData[selectvalue[0]].sub[i].code})
          if(cityData[selectvalue[0]].sub[i].code==that.data.custinfo.customer.cityId)
          {
            selectvalue=[selectvalue[0],i,0];
          }
      }
      if( cityData[selectvalue[1]].sub.length>0)
      {
        for (let i = 0 ; i < cityData[selectvalue[0]].sub[selectvalue[1]].sub.length; i++) {
          if(cityData[selectvalue[0]].sub.length>0)
          {
            countys.push({text:cityData[selectvalue[0]].sub[selectvalue[1]].sub[i].name,value:cityData[selectvalue[0]].sub[selectvalue[1]].sub[i].code})
            if(cityData[selectvalue[0]].sub[selectvalue[1]].sub[i].code==that.data.custinfo.customer.countyId)
            {
              selectvalue=[selectvalue[0],selectvalue[1],i];
            }
          }
        }
      };

       that.setData({
        'areamodel.provinces': provinces,
        'areamodel.citys':citys,
        'areamodel.countys':countys,
        'areamodel.value':selectvalue,
        'areamodel.lastvalue':selectvalue
      });
  },
  setcusttype(){
    var that=this;
    if(that.data.custinfo.customer.classId==3)
      {
        that.setData({
              "custtypeList.data":[{text:"最终客户",value:0}]
        });
      }
      else{
        ajaxInti.InitCustType(that,app,function(resultdata){
          var linsData=[];
          var selectindex=[0];
          var index=0;
          for(var i=0;i<resultdata.data.length;i++)
          {
              if(resultdata.data[i].typeId==that.data.custinfo.customer.classId)
              {
                linsData.push({text:resultdata.data[i].title,value:resultdata.data[i].code})
                if(resultdata.data[i].code==that.data.custinfo.customer.typeId)
                {
                  selectindex=[index];
                }
                index++;
              }
          };
          that.setData({
              "custtypeList.data":linsData,
              'custtypeList.value':selectindex,
              'custtypeList.lastvalue':selectindex
          });
        });
    }
  },
  setIndustry(){
    var that=this;
    ajaxInti.InitIndustry(that,app,function(resultdata){
      var linsData=[];
      var selectindex=[0];
      for(var i=0;i<resultdata.data.length;i++)
      {
          linsData.push({text:resultdata.data[i].title,value:resultdata.data[i].id})
          if(resultdata.data[i].id==that.data.custinfo.customer.industryId)
          {
              selectindex=[i];
          }
      }
      that.setData({
          "industryList.data":linsData,
          "industryList.value":selectindex,
          "industryList.lastvalue":selectindex
      });
    });
  },
  setsource(){
    var that=this;
    ajaxInti.InitSource(that,app,function(resultdata){
      var linsData=[];
      var selectindex=[0];
      var seltext="";
      for(var i=0;i<resultdata.data.length;i++)
      {
          linsData.push({text:resultdata.data[i].title,value:resultdata.data[i].id})
          if(resultdata.data[i].id==that.data.custinfo.extend.source)
          {
              selectindex=[i];
              seltext=linsData[selectindex[0]].text
          }
      }
      that.setData({
          "sourceList.data":linsData,
           "custinfo.extend.sourcetext":seltext,
          "sourceList.value":selectindex,
          "sourceList.lastvalue":selectindex
      });
    });
  },
  custtypeList_close(){
    this.setData({
      "custtypeList.isShow":!this.data.custtypeList.isShow,
      "custtypeList.value":this.data.custtypeList.lastvalue
    });
  },
  custtypeList_open(){
    this.setData({
      "custtypeList.isShow":!this.data.custtypeList.isShow
    });
    if(this.data.custtypeList.isShow==false)
    {
      var value=this.data.custtypeList.value;
      //关闭
      this.setData({
        "custinfo.customer.typeName":this.data.custtypeList.data[value[0]].text,
        "custinfo.customer.typeId":this.data.custtypeList.data[value[0]].value,
        "custtypeList.lastvalue":value
      });
    }
  },
  custtypeList_onChange(e){
      let val = e.detail.value
      this.setData({
        "custtypeList.value":[val[0]]
      })
  },
  industryList_close(){
    this.setData({
      "industryList.isShow":!this.data.industryList.isShow,
      "industryList.value":this.data.industryList.lastvalue
    });
  },
  industryList_open(){
    this.setData({
      "industryList.isShow":!this.data.industryList.isShow
    });
    if(this.data.industryList.isShow==false)
    {
      var value=this.data.industryList.value;
      //关闭
      this.setData({
        "custinfo.customer.industry":this.data.industryList.data[value[0]].text,
        "custinfo.customer.industryId":this.data.industryList.data[value[0]].value,
        "industryList.lastvalue":value
      });
    }
  },
  industryList_onChange(e){
      let val = e.detail.value
      this.setData({
        "industryList.value":[val[0]]
      })
  },
  sourceList_close(){
    this.setData({
      "sourceList.isShow":!this.data.sourceList.isShow,
      "sourceList.value":this.data.sourceList.lastvalue
    });
  },
  sourceList_open(){
    this.setData({
      "sourceList.isShow":!this.data.sourceList.isShow
    });
    if(this.data.sourceList.isShow==false)
    {
      var value=this.data.sourceList.value;
      //关闭
      this.setData({
        "custinfo.extend.source":this.data.sourceList.data[value[0]].value,
        "custinfo.extend.sourcetext":this.data.sourceList.data[value[0]].text,
        "sourceList.lastvalue":value
      });
    }
  },
  sourceList_onChange(e){
      let val = e.detail.value;
      this.setData({
        "sourceList.value":[val[0]]
      })
  },
  submitsave(e){
    var flag=app.valueVerification(this.data.custinfo.customer.custName,4,80,null,"请输入客户名称（4-80位）");
    if(flag)
    {
      this.repeatCustomer(1);
    }
  },
  repeatCustomer:function(object){
    if(app.vnull(this.data.custinfo.customer.custName))
    {
      var param={
        "custName":this.data.custinfo.customer.custName,
        "companyId":app.getuserinfo().companyId,
        "custId": this.data.custinfo.customer.id,
        "firmId": app.getuserinfo().firmId,
        "tel":this.data.custinfo.extend.tel
      };
      var that=this;
      ajaxInti.IntiContent(that,app,app.APIURL.RepeatCustomer,param,function(result){
        if(result.data.code=="0")
        {
           // 可使用客户名
           if(typeof(object)!="object")
           {
              var params=app.JsonToData(that.data.custinfo);
              ajaxInti.InitSubmitPage(that,app,app.APIURL.CustEditSave,params,function(result){
                  dd.navigateBack({
                  delta: 1
                  })
              })
           } 
           else{
             app.showToast("success","可使用客户名");
           }
        }
        else{
           // 客户名已存在
            if(result.data.code=="2.0"||result.data.code=="2.2")
            {
              app.showToast("fail","集团范围内座机存在重复");
            }  
            else{
              app.showToast("fail","集团范围内客户名已存在");
            }
        }
      });
     }
     else{
       app.showToast("fail","请输入客户名");
     }
    },
  getinputvalue:function(e){
   var name= e.currentTarget.dataset.name;
   var value=e.detail.value;
   var data=this.data.custinfo;
   for(var object in data)
   {
     if(typeof(data[object])=="object")
     {
        app.setinputtodata(object,data,name,value);
     }
     else if(object==name)
      {
        data[object]=value;
      }
   }
  },
  getlocation:function(){
    var that=this;
    dd.getLocation({
      type:3,
      success(res) {
        my.hideLoading();
        that.setData({
          "custinfo.customer.longitude":res.longitude,
          "custinfo.customer.latitude":res.latitude,
          "custinfo.customer.address":res.address
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
  }
});
