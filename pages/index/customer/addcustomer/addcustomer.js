import tcity from '../../../CommonComponent/citydata-new.js';
import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    provinces: [],
    province: '',
    provinceId:'',
    citys: [],
    city: '',
    cityId:'',
    countys: [],
    county: '',
    countyId:'',
    value: [0, 0, 0],
    values: [0, 0, 0],
    areatext:'',
    selarea:['','',''],
    isShow: false,
    custparentType:[
      {
        value:'1',
        text:'直销类型',
        children:"directCustType"
      },
      {
        value:'2',
        text:'渠道类型',
        children:"channelCustType"
		  },
      {
        value:'3',
        text:'最终客户',
        children: [{ value:'0', text:'最终客户' }]
      }
      ],
    custchildrenType:[],
    selTypeData:[],
    custtypevalue:[0,0],   
    custTypeId:'', 
    classId:'', 
    typetext:'',
    isShowtype:false,
    custyupelist:[],//客户行业数据
    isShowhangye:false,
    selcustval:[0],
    industryId:'',  
    custyupetext:'',
    isShowSex:false,
    selsexval:[0],
    selsextext:"先生",
    sex:"",
    query:null,
    userinfo:{},
    longitude:'',
    latitude:'',
    custinputwidth:0,
    addressinputwidth:0,
    custName:'',
    selsourceval:[0],
    sourcetext:'',
    sourcevalue:'',
    isShowsource:false
  },
  onLoad() {
     //初始化用户登录信息
    var that=this;
    that.setData({
      "custinputwidth":app.sysinfo.windowWidth-25-70-1-20-15,
      "addressinputwidth":app.sysinfo.windowWidth-25-70-20-15
    })
    app.getuserinfo(that);
    tcity.init(that);
    ajaxInti.InitArea(that,true);
    ajaxInti.InitCustType(that,app,function(resultdata){
      var linsData=[];
      for(var i=0;i<resultdata.data.length;i++)
      {
          if(resultdata.data[i].typeId==1)
          {
          linsData.push({title:resultdata.data[i].title,code:resultdata.data[i].code})
          }
      }
      that.setData({
          custchildrenType:resultdata.data,
          selTypeData:linsData
      });
    });
    ajaxInti.InitIndustry(that,app,function(resultdata){
      var linsData=[];
      for(var i=0;i<resultdata.data.length;i++)
      {
          linsData.push({text:resultdata.data[i].title,value:resultdata.data[i].id})
      }
      that.setData({
          custyupelist:linsData
      });
    });
    //客户来源
    ajaxInti.InitSource(that,app,function(resultdata){
      var linsData=[];
      for(var i=0;i<resultdata.data.length;i++)
      {
          linsData.push({text:resultdata.data[i].title,value:resultdata.data[i].id})
      }
      that.setData({
          selsourceval:linsData
      });
    });
    that.getlocation();
    },
  onChange(e) {
    let val = e.detail.value
    let t = this.data.values;
    let cityData = this.data.cityData;
    
    if(val[0] != t[0]){
      const citys = [];
      const countys = [];
      for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      if(cityData[val[0]].sub.length>0)
      {
        for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push(cityData[val[0]].sub[0].sub[i].name)
        }
      }
      this.setData({
        citys:citys,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })
      return;
    }
    if(val[1] != t[1]){
      const countys = [];
      for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys:countys,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }
    if(val[2] != t[2]){
      this.setData({
        county: this.data.countys[val[2]],
        values: val,
        value:[val[0],val[1],val[2]]
      })
      return;
    }
  },
  open(){
    this.setData({
      isShow:!this.data.isShow
    })
    if(!this.data.isShow)
    {
      //关闭弹出的区域选择器时将值返回
     
       var selresult=["","",""];
       if(this.data.cityData[this.data.value[0]].code.length>0)
      {
        selresult=[this.data.cityData[this.data.value[0]].code,this.data.cityData[this.data.value[0]].sub[this.data.value[1]].code,this.data.cityData[this.data.value[0]].sub[this.data.value[1]].sub[this.data.value[2]].code]
      }
       this.setData({
         selarea:selresult,
         province: this.data.provinces[this.data.value[0]],
         city: this.data.citys[this.data.value[1]],
         county:this.data.countys[this.data.value[2]],
         provinceId: selresult[0],
         cityId: selresult[1],
         countyId:selresult[2],
         areatext:this.data.cityData[this.data.value[0]].name+" "+this.data.cityData[this.data.value[0]].sub[this.data.value[1]].name+" "+this.data.cityData[this.data.value[0]].sub[this.data.value[1]].sub[this.data.value[2]].name
       });
    }
  },
  close(){
     this.setData({
      isShow:!this.data.isShow
    })
  },
onChangeType:function(e){
    let val = e.detail.value
    let typedata = this.data.custchildrenType;
    const selTypeData = [];
    if(val[0]!=this.data.custtypevalue[0])
    {
        for(var i=0;i<typedata.length;i++)
        {
        if(this.data.custparentType[val[0]].value==typedata[i].typeId)
        {
            selTypeData.push({title:typedata[i].title,code:typedata[i].code});
        }
        }
        if(val[0]==2)
        {
            selTypeData.push({title:"最终客户",code:""})
        };
        this.setData({
        custtypevalue: [val[0],0],
        selTypeData:selTypeData
        })
        return;
    }
    if(val[1]!=this.data.custtypevalue[1])
    {
        this.setData({
        custtypevalue: [val[0],val[1]],
        })
        return;
    }
},
opentype:function(){
this.setData({
    isShowtype:!this.data.isShowtype
})
if(!this.data.isShowtype)
{
    // //关闭弹出的区域选择器时将值返回
    const val=this.data.custtypevalue;
    this.setData({
        "typetext":this.data.selTypeData[this.data.custtypevalue[1]].title,
        "custTypeId":this.data.selTypeData[this.data.custtypevalue[1]].code,
        "classId":this.data.custparentType[this.data.custtypevalue[0]].value
    });
}
},
closetype:function(){
    this.setData({
    isShowtype:!this.data.isShowtype
})
},
onChangeCust:function(e){
    let val = e.detail.value
    let custyupelist = this.data.custyupelist;
    if(val[0]!=this.data.selcustval[0])
    {
        this.setData({
        selcustval: [val[0]],
        })
        return;
    }
},
opencusttype:function(){
this.setData({
    isShowhangye:!this.data.isShowhangye
})
if(!this.data.isShowhangye)
{
    // //关闭弹出的区域选择器时将值返回
    this.setData({
        custyupetext:this.data.custyupelist[this.data.selcustval[0]].text,
        industryId:this.data.custyupelist[this.data.selcustval[0]].value
    });
}
},
closecusttype:function(){
    this.setData({
    isShowhangye:!this.data.isShowhangye
  })
},
  onChangeSex:function(e){
    let val = e.detail.value;
    this.setData({
      selsexval:[val[0]]
    });
  },
  opensex:function(){
    this.setData({
      isShowSex:!this.data.isShowSex
    });
    if(!this.data.isShowSex)
    {
      // //关闭弹出的区域选择器时将值返回
       this.setData({
          selsextext:(this.data.selsexval[0]==0?"先生":"女士"),
          sex:this.data.selsexval[0]
       });
    }
  },
  closesex:function(){
    this.setData({
      isShowSex:!this.data.isShowSex
    })
  },
  onsource:function(e){
    let val = e.detail.value;
    this.setData({
      sourcevalue:[val[0]]
    });
  },
  opensource:function(){
    this.setData({
        isShowsource:!this.data.isShowsource
      });
      if(!this.data.isShowsource)
      {
        this.setData({
            sourcetext:this.data.selsourceval[this.data.sourcevalue].text,
            sourcevalue:this.data.sourcevalue
        });
      }
  },
  closesource:function(){
    this.setData({
      isShowsource:!this.data.isShowsource
    })
  },
  custSubmit:function(e){
    var dataparam=e.detail.value;
    var flag=app.valueVerification(dataparam.custName,4,80,null,"请输入客户名称（4-80位）");
    if(flag)
    {
      flag=app.valueVerification(this.data.sourcevalue,null,null,null,"请选择客户来源");
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.industryId,null,null,null,"请选择客户行业");
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.countyId,null,null,null,"请选择客户区域");
      if(flag)
      {
        flag=app.valueVerification(this.data.cityId,null,null,null,"请选择客户区域");
        if(flag)
        {
        flag=app.valueVerification(this.data.provinceId,null,null,null,"请选择客户区域");
        }
      }
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.classId,null,null,null,"请选择客户类型");
      if(flag)
      {
      flag=app.valueVerification(this.data.custTypeId,null,null,null,"请选择客户类型");
      }
    }
    if(flag)
    {
       flag=app.valueVerification(dataparam.fullName,null,null,null,"请填写联系人姓名");
    }
    if(flag){
      if(flag)
      {
        flag=app.valueVerification(dataparam.tel,null,null,null,"");
        if(!flag)
        {
          flag = app.valueVerification(dataparam.phoneNum, null, null, null, "手机号和电话号码必填一个");
        }
      }
    }
    if(flag)
    {
      var params = {
				"customer": {
					"custName": dataparam.custName,
					"typeId":this.data.custTypeId,
					"industry": this.data.custyupetext,
					"industryId":this.data.industryId,
					"province":this.data.province,
					"provinceId":this.data.provinceId,
					"city":this.data.city,
					"cityId":this.data.cityId,
					"county":this.data.county,
					"countyId":this.data.countyId,
					"address":dataparam.address,
					"createUserId": app.getuserinfo().uid,
					"ownUserId": app.getuserinfo().uid,
					"ownUser": app.getuserinfo().fullName,
					"companyId": app.getuserinfo().companyId,
					"firmId": app.getuserinfo().firmId,
					"longitude": this.data.longitude,
					"latitude": this.data.latitude,
					"classId":this.data.classId,
          "companydataId": ''
				},
				"linkman": {
					"fullName":dataparam.fullName,
					"sex":(this.data.sex==0?"先生":"女士"),
					"deptName":dataparam.deptName,
					"postName":dataparam.postName,
					"phoneNum":dataparam.phoneNum,
					"tel":dataparam.tel,
					"qq": "",
					"email":dataparam.email
        },
        "extend": {
          "source":this.data.sourcevalue,
          "importVersion": ''
        }
			};
    var that=this;
    params=app.JsonToData(params);
    //提交表單
    this.repeatCustomer(dataparam.custName,dataparam.tel,'',params);
    }
  },
  onReady() {
    this.setData({
      query:dd.createSelectorQuery()
    })
  },
  bindKeyInput(e){
    // debugger;
  },
  getlocation:function(){
    var that=this;
    dd.getLocation({
      type:3,
      success(res) {
        my.hideLoading();
        that.setData({
          "longitude":res.longitude,
          "latitude":res.latitude,
          "address":res.address
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
  repeatCustomer:function(custname,tel,custId,params){
    if(app.vnull(this.data.custName))
    {
      var param={
        "custName":(app.vnull(this.data.custName)?this.data.custName:''),
        "companyId":app.getuserinfo().companyId,
        "custId": (app.vnull(custId)?custId:''),
        "firmId": app.getuserinfo().firmId,
        "tel":tel
      };
      var that=this;
      ajaxInti.IntiContent(that,app,app.APIURL.RepeatCustomer,param,function(result){
        if(result.data.code!="0")
        {
          dd.showToast({
            type: 'fail',
            content: '客户名已存在',
            duration: 1000,
            success: () => {
            },
          }); 
        }
        else{
          if(typeof(custname)!="object")
          {
            that.savedata(params);
          }
          else{
            dd.showToast({
              type: 'success',
              content: '可使用客户名',
              duration: 1000,
              success: () => {
              },
            });
          }
        }
      });
     }
     else{
        dd.showToast({
          type: 'fail',
          content: '先输入客户名称',
          duration: 1000,
          success: () => {
          },
        }); 
     }
    },
    savedata:function(params){
      ajaxInti.InitSubmitPage(this,app,app.APIURL.CustAddSave,params,function(result){
          dd.navigateBack({
          delta: 1
          })
      })
    },
  getinputvalue:function(e){
    var value=e.detail.value;
    var name= e.currentTarget.dataset.name;
    var data=this.data;
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

  }
});
