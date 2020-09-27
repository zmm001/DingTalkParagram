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
      followuserId:'',
      followusername:'',
      followupstate:'',
      followupstateName:'',
      followupstateold:'',
      followupstateoldName:'',
      isfoucs:'',
      keyWord:'',
      Issearchbtn:false
    },
    selectData:{
      isShow:false,
      selecttype:'',
      val:[0],
      lastvalue:"0,0,0,0",
      data:[],
      presondata:[],
      followstate:[{
						value: '0',
						text: '联系状态'
					},
					{
						value:'7',
						text:'最近7天需拜访'
					},
					{
						value:'8',
						text:'最近14天需拜访'
					},
					{
						value:'9',
						text:'最近30天需拜访'
					}],
      followstateold:[{
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
					}],
      myfoucs:[{
						value: '',
						text: '全部'
					},
					{
						value: '1',
						text: '我的关注'
					},
					{
						value: '2',
						text: '我未关注'
					}]
    },
    inputwidth:0
  },
  onLoad() {
    var that=this;
    that.getpoweruserlist();
    that.getprojectlist();
    that.setData({
      scrollheight: app.sysinfo.windowHeight-90,
      "inputwidth": app.sysinfo.windowWidth-10-32,
      "inponewidth":app.sysinfo.windowWidth-30
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
        curUserId:this.data.searchmode.followuserId,
        curOverdue:this.data.searchmode.followupstate,
        curNormal:this.data.searchmode.followupstateold,
        curAttention:this.data.searchmode.isfoucs,
        curKeyWord:this.data.searchmode.keyWord,
        page: this.data.projectlist.curPage,
        pageSize: app.PAGE_SIZE.size8
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetFollowupPlanList,param,function(resultlist){
          var linsData=that.data.projectlist.data;
          var dataJson=resultlist.data.dataList;
          var PageCount=resultlist.data.pageCount;
          var curPage=resultlist.data.curPage;
          for(var i=0;i<dataJson.length;i++)
          {
            var createDatestring =app.timeobjecttostring(new Date(dataJson[i].linkDate),"YYYY-MM-dd");
              linsData.push(
                {
                  id:dataJson[i].id,
                  custName:dataJson[i].custName,
                  linkDate:createDatestring,
                  fullName:dataJson[i].fullName,
                  content:dataJson[i].content
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
        "projectlist.loadtext":'正在加载...',
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
    const page = '../follow/followinfo/followinfo?id='+e.currentTarget.dataset.id+'&plan=true';
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
  closebottom:function(){
    this.setData({
      "selectData.isShow":!this.data.selectData.isShow
    });
  },
  openbottom:function(e){
    try{
      var curtype=e.currentTarget.dataset.value;
      if(app.vnull(curtype))
      {
        this.setData({
          "selectData.curtype":curtype,
        });
      }
    }
    catch(e){};
    var curdata=this.data.selectData.data;
    if(this.data.selectData.curtype=='followuser')
    {
        curdata=this.data.selectData.presondata;
    }
    else if(this.data.selectData.curtype=='state')
    {
        curdata=this.data.selectData.followstate;
    }
    else if(this.data.selectData.curtype=='stateold')
    {
        curdata=this.data.selectData.followstateold;
    }
    else if(this.data.selectData.curtype=='foucs')
    {
        curdata=this.data.selectData.myfoucs;
    }
    this.setData({
      "selectData.isShow":!this.data.selectData.isShow,
      "selectData.data":curdata
    });
    var lastvalue=this.data.selectData.lastvalue;
    var lastvaluearry=lastvalue.split(',');
    if(this.data.selectData.isShow==false)
    {
      var preson= this.data.selectData;
      if(preson.data[preson.val[0]].value!="")
      {
          
          var lastvaluenew='';
          if(this.data.selectData.curtype=='followuser')
          {
              this.setData({
                "searchmode.followuserId":preson.data[preson.val[0]].value,
                "searchmode.followusername":preson.data[preson.val[0]].text
              });
              lastvaluenew+=preson.val[0]+",";
          }else{
              lastvaluenew+="0,";
          }
          if(this.data.selectData.curtype=='state')
          {
              this.setData({
                "searchmode.followupstate":preson.data[preson.val[0]].value,
                "searchmode.followupstateName":preson.data[preson.val[0]].text
              });
              lastvaluenew+=preson.val[0]+",";
          }else{lastvaluenew+="0,";}
          if(this.data.selectData.curtype=='stateold')
          {
              this.setData({
                "searchmode.followupstateold":preson.data[preson.val[0]].value,
                "searchmode.followupstateoldname":preson.data[preson.val[0]].text
              });
              lastvaluenew+=preson.val[0]+",";
          }else{lastvaluenew+="0,";}
          if(this.data.selectData.curtype=='foucs')
          {
              this.setData({
                "searchmode.isfoucs":preson.data[preson.val[0]].value
              });
              lastvaluenew+=preson.val[0];
          }else{lastvaluenew+="0";}
          this.setData({
            'selectData.lastvalue':lastvaluenew
          })
      }
      else{
          if(this.data.selectData.curtype=='followuser')
          {
              this.setData({
                "searchmode.followuserId":'',
                "searchmode.followusername":''
              });
          }
          else if(this.data.selectData.curtype=='state')
          {
              this.setData({
                "searchmode.followupstate":'',
                "searchmode.followupstateName":''
              });
          }
          else if(this.data.selectData.curtype=='stateold')
          {
              this.setData({
                "searchmode.followupstateold":'',
                "searchmode.followupstateoldname":''
              });
          }
          else if(this.data.selectData.curtype=='foucs')
          {
              this.setData({
                "searchmode.isfoucs":''
              });
          }
      }
      this.projectrefreshre();
    }else{
         if(this.data.selectData.curtype=='followuser')
          {
              this.setData({
                "selectData.val":[parseInt(lastvaluearry[0])]
              });
          }
          else if(this.data.selectData.curtype=='state')
          {
              this.setData({
                "selectData.val":[parseInt(lastvaluearry[1])]
              });
          }
          else if(this.data.selectData.curtype=='stateold')
          {
             this.setData({
                "selectData.val":[parseInt(lastvaluearry[2])]
              });
          }
          else if(this.data.selectData.curtype=='foucs')
          {
              this.setData({
                "selectData.val":[parseInt(lastvaluearry[3])]
              });
          }
    }
  },
  changeselect:function(e){
    let val=e.detail.value;
    var selval=this.data.selectData.val;
    if(val[0]!=selval[0])
    {
        this.setData({
          "selectData.val":val,
        });
    }
  },
  getpoweruserlist:function(){
    var param={
      userId: app.userinfo.uid,
			firmId: app.userinfo.firmId
    };
    var that=this;
    ajaxInti.IntiContent(this,app,app.APIURL.FollowUpUserPower,param,function(data){
      var linsData=[];
      linsData.push({text:"全部",value:""})
      for(var i=0;i<data.data.length;i++)
      {
          linsData.push({text:data.data[i].fullName,value:data.data[i].id})
      }
      that.setData({
        "selectData.presondata":linsData
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
