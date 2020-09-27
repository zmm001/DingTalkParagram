import ajaxInti from '../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    projectlist:{
      curPage:1,
      PageCount:1,
      oncheck:"checkDetail",
      oncellphone:"cellphone",
      active:true,
      loadtext:"正在加载...",
      data:[]
    },
    searchmode:{
      projectState:'0',
      projectStateName:'',
      curfollowupstate:'0',
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
    inputwidth:0
  },
  onLoad() {
    if(this.data.estimatedate.data.length==0)
    {
      this.getestimatedate();
    }
        var that=this;
     that.getprojectstate();
     that.getpoweruserlist();
  
    that.getprojectlist();
    that.setData({
      scrollheight: app.sysinfo.windowHeight-90,
      "inputwidth": app.sysinfo.windowWidth-10-32,
      "inponewidth":app.sysinfo.windowWidth-30-40-35
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
        selectOrderby:this.data.searchmode.projectState,
        followupstate:this.data.searchmode.curfollowupstate,
        saleId:this.data.searchmode.saleUserId,
        searchcontent:this.data.searchmode.keyWord,
        page: this.data.projectlist.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetLinkManListAll,param,function(resultlist){
          var linsData=that.data.projectlist.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
              linsData.push(
                {
                  id:dataJson[i].id,
                  icon:(dataJson[i].sex=="先生"?"../../../images/watch1.png":"../../../images/watch3.png"),
                  tel:(dataJson[i].phoneNum.length>0?dataJson[i].phoneNum :(dataJson[i].tel.length>0?dataJson[i].tel:"")),
                  custName:dataJson[i].custName,
                  custId:dataJson[i].custId,
                  fullName:dataJson[i].fullName,
                  sendName:'已跟进次数'+(dataJson[i].sendName==""?"0":dataJson[i].sendName)+'次数'
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
    this.getprojectlist();
  },
  //查看跟进详情
  checkDetail:function(e){
    const page = 'LinkManShow/LinkManShow?id='+e.currentTarget.dataset.id;
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
    var linsData=[];
    linsData.push({value: '0',
						text: '跟进排序'},
						{
						value: '1',
						text: '跟进次数降序'
						},
						{
						value: '2',
						text: '跟进次数升序'
					});
    
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
      var estimatedate= this.data.curfollowupstate;
      if(estimatedate.data[estimatedate.val[0]].value!="")
      {
        this.setData({
          "searchmode.curfollowupstate":estimatedate.data[estimatedate.val[0]].value
        });
      }
      else{
        this.setData({
          "searchmode.curfollowupstate":''
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
  getprojectstate:function(){
    var linsData=[{
						value: '0',
						text: '联系状态'
					},
					{
						value: '1',
						text: '超过7天未联系'
					},
					{
						value: '2',
						text: '超过14天未联系'
					},
					{
						value: '3',
						text: '超过30天未联系'
					},
					{
						value:'4',
						text:'超过2个月未联系'
					},
					{
						value:'5',
						text:'超过3个月未联系'
					},
					{
						value:'6',
						text:'超过半年未联系'
					},
					{
						value:'7',
						text:'最近7天联系过'
					},
					{
						value:'8',
						text:'最近14天联系过'
					},{
						value:'9',
						text:'最近30天联系过'
					}];
    
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
    linsData.push({text:'全部',value:''});
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
  cleartime:function(){
     this.setData({
      "DatePicker.isShow":false,
      "DatePicker.val":this.data.DatePicker.lastval,
      "searchmode.createDate":''
    });
    this.projectrefreshre();
  },
  /**获取客户联系人中有权限看到的人员 */
  getpoweruserlist:function(){
    var param={
      userId: app.userinfo.uid,
			firmId: app.userinfo.firmId
    };
     var that=this;
    ajaxInti.IntiContent(this,app,app.APIURL.CustHasRightUser,param,function(data){
      var linsData=[];
      linsData.push({text:"归属销售",value:""})
      for(var i=0;i<data.data.length;i++)
      {
          linsData.push({text:data.data[i].ownUser,value:data.data[i].ownUserId})
      }
      that.setData({
        "preson.data":linsData
      });
    });
  },
  cellphone(e){
    var telnumber=e.currentTarget.dataset.tel;
    if(telnumber.length>0)
    {
      if(telnumber.indexOf('-')>-1)
      {
        telnumber=telnumber.split('-')[1];
      }
      app.telto(telnumber);
    }
  }
});
