import tcity from '../../CommonComponent/citydata-new.js';
import list from '../../CommonComponent/list';
import ajaxInti from '../../CommonComponent/ajaxlist.js';

let app = getApp()

Page({
  ...list,
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    areatext:"",
    selarea:["","",""],
    isShow: false,
    typetext:"",
    isShowtype:false,
    isShowpreson:false,
    Issearchbtn:false,
    searchClass:"searchinput",
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
    seltype:["",""], 
    presonlist:[],
    selpreson:[0],  
    searchtext:"",
    isPageShow:false,
    curPage:1,
    PageCount:1,
    listData: {
      onItemTap: 'checkDetail',
      data: []
    }
  },
  onLoad() {
    var that = this;
    tcity.init(that);
    ajaxInti.InitArea(that,false);
      console.log('onLoad::::')
    ajaxInti.InitCustType(that,app,function(resultdata){
      console.log('InitCustType::::'+resultdata)
      var linsData=[];
      linsData.push({title:"全部",code:""})
      for(var i=0;i<resultdata.data.length;i++)
      {
        if(resultdata.data[i].typeId==1)
        {
          linsData.push({title:resultdata.data[i].title,code:resultdata.data[i].code})
        }
      }
      that.setData({
        custchildrenType:resultdata.data,
        selTypeData:linsData,
        typetext:"直营客户"
      });
    });
    ajaxInti.InitSelectPreson(that,app,function(resultdata){
        var linsData=[];
        linsData.push({text:"全部",value:""})
        for(var i=0;i<resultdata.data.length;i++)
        {
            linsData.push({text:resultdata.data[i].fullName,value:resultdata.data[i].id})
        }
        that.setData({
          presonlist:linsData,
          selpreson:[0],
          presontext:"全部"
        });
    });
     //顶部
      this.setData({
        "listData.data":[]
      });
     this.setData({
        srcheight: app.sysinfo.windowHeight-34-48,
     })
     this.blurchange();
  },
  onShow() {
    this.customerrefreshre();
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
        province: this.data.provinces[val[0]],
        city: (cityData[val[0]].sub.length>0?cityData[val[0]].sub[0].name:""),
        citys:citys,
        county: (cityData[val[0]].sub.length>0?cityData[val[0]].sub[0].sub[0].name:""),
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
  onChangeType:function(e){
      let val = e.detail.value
      let typedata = this.data.custchildrenType;
      const selTypeData = [];
      if(val[0]!=this.data.custtypevalue[0])
      {
           selTypeData.push({title:"全部",code:""})
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
  onChangePreson:function(e){
      let val = e.detail.value
      let presonlist = this.data.presonlist;
      if(val[0]!=this.data.selpreson[0])
      {
           this.setData({
            selpreson: [val[0]],
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
       this.setData({
         areatext:this.data.county
       });
       var selresult=["","",""]
       if(this.data.cityData[this.data.value[0]].code.length>0)
      {
        selresult=[this.data.cityData[this.data.value[0]].code,this.data.cityData[this.data.value[0]].sub[this.data.value[1]].code,this.data.cityData[this.data.value[0]].sub[this.data.value[1]].sub[this.data.value[2]].code]
      }
       this.setData({
         selarea:selresult
       });
        this.setData({
          scrollTop:0,
          curPage:1,
          loadtext:"正在加载...",
          "listData.data":[]
        });
        this.getdatalistinfo(this,app);
    }
  },
  close(){
     this.setData({
      isShow:!this.data.isShow
    })
  },
  opentype(){
    this.setData({
      isShowtype:!this.data.isShowtype
    })
    if(!this.data.isShowtype)
    {
      // //关闭弹出的区域选择器时将值返回
        const val=this.data.custtypevalue;
          var textinner="";
           if(val[0]==0){
              textinner="直营客户";
           }
           else if(val[0]==1)
          {
              textinner="渠道客户";
          }
          else if(val[0]==2)
          {
             textinner="最终客户";
          }
          else if(val[1].length>0)
          {
           textinner= this.data.selTypeData[this.data.custtypevalue[1]].title
          }
       this.setData({
         typetext:textinner,
         seltype:[this.data.custparentType[this.data.custtypevalue[0]].value,this.data.selTypeData[this.data.custtypevalue[1]].code]
       });
       this.setData({
          scrollTop:0,
          curPage:1,
          loadtext:"正在加载...",
          "listData.data":[]
        });
        this.getdatalistinfo(this,app);
    }
  },
  closetype(){
     this.setData({
      isShowtype:!this.data.isShowtype
    })
  },
  openpreson(){
    this.setData({
      isShowpreson:!this.data.isShowpreson
    })
    if(!this.data.isShowpreson)
    {
      // //关闭弹出的区域选择器时将值返回
       this.setData({
         presontext:this.data.presonlist[this.data.selpreson[0]].text
       });
       this.setData({
          scrollTop:0,
          curPage:1,
          loadtext:"正在加载...",
          "listData.data":[]
        });
        this.getdatalistinfo(this,app);
    }
  },
  closepreson(){
     this.setData({
      isShowpreson:!this.data.isShowpreson
    })
  },
  scroll:function(e){
     if(e.detail.scrollHeight-e.detail.scrollTop==this.data.srcheight){ 
      //底部
      this.data.curPage=this.data.curPage+1;
       this.setData({
          loadtext:"正在加载..."
        });
      this.getdatalistinfo(this,app);
    } 
  },
  customerrefreshre:function(){
     this.setData({
        curPage:1,
        "isrefash":true,
        loadtext:"正在加载...",
        "listData.data":[]
      });
      this.getdatalistinfo(this,app);
  },
  checkDetail(e){
      const page = 'customerdetail/customerdetail?id='+e.target.dataset.id;
      dd.navigateTo({ url: page });
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
  },
  bindKeyInput:function(e){
     this.setData({
       searchtext: e.detail.value
     });
  },
  search:function(){
     this.setData({
        scrollTop:0,
        curPage:1,
        "isrefash":true,
        loadtext:"正在加载...",
        "listData.data":[]
      });
    this.getdatalistinfo(this,app);
  },
  getdatalistinfo(){
    var that=this;
    var selval="";
    if(that.data.presonlist.length>0){
      selval=that.data.presonlist[that.data.selpreson[0]].value
    }
    var params={
        uId: app.userinfo.uid,
        firmId: app.userinfo.firmId,
        custName: that.data.searchtext,
        provinceId: that.data.selarea[0],
        cityId:that.data.selarea[1],
        countyId: that.data.selarea[2],
        custTypeId: that.data.seltype[1],
        bigClass: that.data.seltype[0],
        selUserId: selval,
        page: that.data.curPage,
        pageSize: app.PAGE_SIZE.size8
    };
      if(that.data.curPage<=that.data.PageCount)
      {
        ajaxInti.InitPageList(that,app,app.APIURL.AllCustList_V2,params,function(resultList){
          if(that.data.isrefash)
          {
            setTimeout(function() {
              that.setData({
                "isrefash":false
              });
              }.bind(that), 500);
          };
          var linsData=that.data.listData.data;
          var datalist=resultList.data.dataList;
          for(var i=0;i<datalist.length;i++)
          {
              linsData.push(
                {
                  custtype:datalist[i].typeName,
                  createdate:datalist[i].createTime.substring(5,datalist[i].createTime.length),
                  custname:datalist[i].custName,
                  ownname:datalist[i].ownUser,
                  id:datalist[i].id
                });
          }
          that.setData({
            "listData.data":linsData,
            loadtext:"上拉加载更多...",
            PageCount:resultList.data.pageCount,
            isload:true
          });
        });
      }
      else{
        that.setData({
              loadtext:"没有更多数据了...",
              isload:true
          });
      }
  }
  })


