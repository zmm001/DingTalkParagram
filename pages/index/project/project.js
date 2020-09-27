import ajaxInti from '../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    projectlist:{
      curPage:1,
      PageCount:1,
      oncheck:"checkDetail",
      active:true,
      loadtext:"正在加载...",
      data:[]
    },
    searchmode:{
      estimateYear:'',
      estimateQuarter:'',
      estimateQuarterName:'',
      projectState:'',
      projectStateName:'',
      createDate:'',
      saleUserId:'',
      saleUserName:'',
      keyWord:'',
      Issearchbtn:false
    },
    estimatedate:{
      isShow:false,
      val:[0],
      lastval:[0],
      data:[]
    },
    projectstate:{
      isShow:false,
      val:[0],
      lastval:[0],
      data:[]
    },
    preson:{
      isShow:false,
      val:[0],
      lastval:[0],
      data:[]
    },
    DatePicker:{
      isShow:false,
      val:[0,0,0],
      lastval:[0,0,0],
      year:[],
      month:[1,2,3,4,5,6,7,8,9,10,11,12],
      day:[]
    },
    projectnumber:0,
    projectprice:"0元",
    inputwidth:0
  },
  onLoad() {
    if(this.data.estimatedate.data.length==0)
    {
      this.getestimatedate();
    }
        var that=this;
      ajaxInti.InitProjectState(that,app,function(){
        var ProjectStateCache=dd.getStorageSync({ key: "ProjectStateCache" });
        that.getprojectstate(ProjectStateCache);
      });
    ajaxInti.InitprojectType(that,app,function(){  

    });
    
    ajaxInti.InitSelectPreson(that,app,function(resultdata){
      var linsData=[];
      linsData.push({text:"全部",value:""})
      for(var i=0;i<resultdata.data.length;i++)
      {
          linsData.push({text:resultdata.data[i].fullName,value:resultdata.data[i].id})
      }
      that.setData({
        "preson.data":linsData
      });
    });
    ajaxInti.IntiDatePicker(that, '1900-01-01', '2100-01-01', app.timeobjecttostring(new Date(),"YYYY-MM-dd"))
    that.setData({
      "DatePicker.lastval":this.data.DatePicker.val,
      refreshre:false
    })
    that.getprojecttotal();
    that.getprojectlist();
    that.setData({
      scrollheight: app.sysinfo.windowHeight-90,
      "inputwidth": app.sysinfo.windowWidth-10-32
    });
     
  },
  onShow(){
    if(app.vnull(this.data.refreshre)&&this.data.refreshre)
    {
      this.setData({
        "projectlist.curPage":1,
        "projectlist.data":[],
        refreshre:false
      });
      this.getprojecttotal();
      this.getprojectlist();
    }
  },
  //获取商机列表
  getprojectlist(){
    if(this.data.projectlist.curPage<=this.data.projectlist.PageCount)
    {
      var param={
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        curUserId: app.userinfo.uid,
				estimateYear: this.data.searchmode.estimateYear,
				estimateQuarter: this.data.searchmode.estimateQuarter,
				projectState: this.data.searchmode.projectState,
				createDate: this.data.searchmode.createDate,
				saleUserId: this.data.searchmode.saleUserId,
				keyWord: this.data.searchmode.keyWord,
        page: this.data.projectlist.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetProjectList,param,function(resultlist){
          var linsData=that.data.projectlist.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              linsData.push(
                {
                  id:dataJson[i].id,
                  projectname:dataJson[i].title,
                  projectNo:dataJson[i].projectNo,
                  custName:dataJson[i].custName,
                  createUser:dataJson[i].createUser,
                  projectState:app.getstatetext(dataJson[i].projectState),
                  estimatePrice:dataJson[i].estimatePrice
                });
          };
          that.setData({
            "projectlist.data":linsData,
            "projectlist.curPage":curPage+1,
            "projectlist.PageCount":PageCount
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
            "projectlist.loadtext":loadtext
          });
      });
    }else{
       this.setData({
          "projectlist.loadtext":'没有更多数据...'
        });
    }
  },
  //客户跟进分页
  projectscroll:function(e){
      if(e.detail.scrollHeight-e.detail.scrollTop==this.data.scrollheight){ 
      this.setData({
        "myfollow.loadtext":'正在加载...',
      });
      //底部
      this.getprojectlist();
    } 
  },
  //刷新
  projectrefreshre:function(e){
    //顶部
    this.setData({
      "projectlist.curPage":1,
      "projectlist.PageCount":1,
      "projectlist.loadtext":'刷新数据中...',
      "projectlist.data":[]
    });
    this.getprojecttotal();
    this.getprojectlist();
  },
  //获取商机数和金额数
  getprojecttotal:function(){
    var param={
        firmId: app.userinfo.firmId,
        userId: app.userinfo.uid,
        curUserId: app.userinfo.uid,
				estimateYear: this.data.searchmode.estimateYear,
				estimateQuarter: this.data.searchmode.estimateQuarter,
				projectState: this.data.searchmode.projectState,
				createDate: this.data.searchmode.createDate,
				saleUserId: this.data.searchmode.saleUserId,
				keyWord: this.data.searchmode.keyWord,
    };
    var that=this;
    ajaxInti.IntiContent(that,app,app.APIURL.GetProjectNumberAndMoney,param,function(result){
      var detail=result.data;
      var money=0;
      if(app.vnull(detail.totalmoney))
      {
        money=detail.totalmoney;
      }
      var moneylength=money.toString().split('.')[0].length;
      var moneystring="";
      if(moneylength<5)
      {
          moneystring=money+"元";
      }
      else if(moneylength>=5&&moneylength<9)
      {
        moneystring=(parseFloat(money)/10000).toFixed(2)+"万元"
      }
      else if(moneylength>9)
      {
        moneystring=(parseFloat(money)/100000000).toFixed(2)+"亿元"
      }
      that.setData({
        projectnumber:detail.counts,
        projectprice:moneystring
      });
    });
  },
  //查看跟进详情
  checkDetail:function(e){
    const page = 'projectdetail/projectdetail?id='+e.currentTarget.dataset.id;
    dd.navigateTo({ url: page });
  },
  searchchange:function(e){
     this.setData({
      "searchmode.keyWord":e.detail.value,
     });
  },
  focuchange:function(e){
    this.setData({
       "inputwidth":app.sysinfo.windowWidth-10-32-46-10,
       "searchmode.Issearchbtn":true
    });
  },
  blurchange:function(){
    this.setData({
       "inputwidth":app.sysinfo.windowWidth-10-32,
       "searchmode.Issearchbtn":false
    });    
  },
  search:function(){
    this.projectrefreshre();
  },
  getestimatedate:function(){
    var nowyear=new Date().getFullYear();
    var linsData=[];
    linsData.push({text:"全部时间",value:''});
    for(var i=nowyear;i>=nowyear-2;i--)
    {
      linsData.push({text:i+"年 全年",value:i+'.4'});
      linsData.push({text:i+"年 3季度",value:i+'.3'});
      linsData.push({text:i+"年 2季度",value:i+'.2'});
      linsData.push({text:i+"年 1季度",value:i+'.1'});
    }
    this.setData({
      "estimatedate.data":linsData
    });
  },
  closeyq:function(){
    this.setData({
      "estimatedate.isShow":!this.data.estimatedate.isShow,
      "estimatedate.val":this.data.estimatedate.lastval
    });
  },
  openyq:function(){
    this.setData({
      "estimatedate.isShow":!this.data.estimatedate.isShow
    });
    if(this.data.estimatedate.isShow==false)
    {
      var estimatedate= this.data.estimatedate;
      if(estimatedate.data[estimatedate.val[0]].value!="")
      {
        this.setData({
          "searchmode.estimateYear":estimatedate.data[estimatedate.val[0]].value.split('.')[0],
          "searchmode.estimateQuarter":estimatedate.data[estimatedate.val[0]].value.split('.')[1],
          "searchmode.estimateQuarterName":estimatedate.data[estimatedate.val[0]].value.split('.')[1]+'季度'
        });
      }
      else{
        this.setData({
          "searchmode.estimateYear":'',
          "searchmode.estimateQuarter":'',
          "searchmode.estimateQuarterName":''
        });
      }
      this.projectrefreshre();
    }
  },
  estimatedateChange:function(e){
    let val=e.detail.value;
    var selval=this.data.estimatedate.val;
    if(val[0]!=selval[0])
    {
        this.setData({
          "estimatedate.val":val,
        });
    }
  },
  getprojectstate:function(ProjectStateCache){
    var linsData=[];
    linsData.push({text:'不限',value:''});
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
          "searchmode.projectState":projectstate.data[projectstate.val[0]].value,
          "searchmode.projectStateName":projectstate.data[projectstate.val[0]].text
        });
      }
      else{
        this.setData({
          "searchmode.projectState":'',
          "searchmode.projectStateName":''
        });
      }
      this.projectrefreshre();
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
  getpreson:function(preson){
    var linsData=[];
    linsData.push({text:'不限',value:''});
    for(var i=0;i<preson.data.length;i++)
    {
      linsData.push({text:preson.data[i].title,value:preson.data[i].code});
    }
    this.setData({
      "preson.data":linsData
    });
  },
  closeyy:function(){
    this.setData({
      "preson.isShow":!this.data.preson.isShow,
      "preson.val":this.data.preson.lastval
    });
  },
  openyy:function(){
    this.setData({
      "preson.isShow":!this.data.preson.isShow
    });
    if(this.data.preson.isShow==false)
    {
      var preson= this.data.preson;
      if(preson.data[preson.val[0]].value!="")
      {
        this.setData({
          "searchmode.saleUserId":preson.data[preson.val[0]].value,
          "searchmode.saleUserName":preson.data[preson.val[0]].text
        });
      }
      else{
        this.setData({
          "searchmode.saleUserId":'',
          "searchmode.saleUserName":''
        });
      }
      this.projectrefreshre();
    }
  },
  presonChange:function(e){
    let val=e.detail.value;
    var selval=this.data.preson.val;
    if(val[0]!=selval[0])
    {
        this.setData({
          "preson.val":val,
        });
    }
  },
  openDatePicker:function(){
    this.setData({
      "DatePicker.isShow":!this.data.DatePicker.isShow
    });
    if(this.data.DatePicker.isShow==false)
    {
      var datemodel=this.data.DatePicker;
      this.setData({
        "searchmode.createDate":datemodel.year[datemodel.val[0]]+"-"+datemodel.month[datemodel.val[1]]+"-"+datemodel.day[datemodel.val[2]]
      });
       this.projectrefreshre();
    }
  },
  closeDatePicker:function(){
    this.setData({
      "DatePicker.isShow":!this.data.DatePicker.isShow,
      "DatePicker.val":this.data.DatePicker.lastval
    });
  },
  DatePickerChange:function(e){
    let val=e.detail.value;
    var selval=this.data.DatePicker.val;
    if(val[0]!=selval[0]||val[1]!=selval[1]||val[2]!=selval[2])
    {
      ajaxInti.IntiDatePicker(this,'1900-01-01','2100-01-01',this.data.DatePicker.year[val[0]]+"-"+this.data.DatePicker.month[val[1]]+"-"+this.data.DatePicker.day[val[2]]);
    }
  },
  cleartime:function(){
     this.setData({
      "DatePicker.isShow":false,
      "DatePicker.val":this.data.DatePicker.lastval,
      "searchmode.createDate":''
    });
    this.projectrefreshre();
  }
});
