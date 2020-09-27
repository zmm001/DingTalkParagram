module.exports={
/**
*@description 获取区域数据填充
*/
InitArea:function(that,iscleartop)
{
  //初始化区域信息
    var cityData = that.data.cityData;
    if(iscleartop)
    {
        if(cityData[0].code.length<1)
        {
        cityData.splice(0, 1);
        }
    }
    const provinces = [];
    const citys = [];
    const countys = [];
    for(let i=0;i<cityData.length;i++){
      provinces.push(cityData[i].name);
    }
    for (let i = 0 ; i < cityData[0].sub.length; i++) {
        citys.push(cityData[0].sub[i].name)
    }
    if( cityData[0].sub.length>0)
    {
    for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
      if(cityData[0].sub.length>0)
      {
      countys.push(cityData[0].sub[0].sub[i].name)
      }
    }
    }
    that.setData({
      'provinces': provinces,
      'citys':citys,
      'countys':countys,
      'province':'',
      'city':'',
      'county':''
    });
    if(iscleartop)
    {
        that.setData({
        'sex':0
        });
    }
    else{
        that.setData({
         'areatext':cityData[0].name
        });
        
    }
},
/**
*@description 初始化客户类型信息
*/
InitCustType:function (that,app,func)
{
    var params={
         firmId: app.userinfo.firmId
    };
    //初始化客户类型信息
    app.AjaxReady(that,app.APIURL.CustType,"GET",params,func);
},
/**
*@description 初始化客户行业信息
*/
InitIndustry:function (that,app,func)
{
     var params={
         firmId: app.userinfo.firmId
    };
  //初始化客户行业信息
  app.AjaxReady(that,app.APIURL.CustIndustry,"GET",params,func);
},
/**
*@description 初始化客户来源信息
*/
InitSource:function (that,app,func)
{
  //初始化客户来源信息
  app.AjaxReady(that,app.APIURL.GetCustSource,"GET",{},func);
},
/**
*@description 初始化有权选择的人员列表
*/
InitSelectPreson:function(that,app,func)
{
  var params={
         firmId: app.userinfo.firmId,
         userId:app.userinfo.uid
    };
  //初始化有权选择的人员列表
  app.AjaxReady(that,app.APIURL.UserPower,"GET",params,func);
},
/**
*@description 初始化商机状态列表
*/
InitProjectState:function(that,app,func)
{
  var params={
        firmId: app.getuserinfo().firmId
    };
  //初始化商机状态列表
  app.AjaxReady(that,app.APIURL.ProjectStateList,"GET",params,function(resultlist){
    dd.setStorage({
      key: 'ProjectStateCache',
      data: resultlist.data,
      success: function() {
        if(typeof(func)=="function")
        {
          func();
        }
      }
    });
  });
},
/**
*@description 初始化商机类型列表
*/
InitprojectType:function(that,app,func)
{
  var params={
        firmId: app.getuserinfo().firmId
    };
  //初始化商机类型列表
  app.AjaxReady(that,app.APIURL.DefinedProjectType,"GET",params,function(resultlist){
    dd.setStorage({
      key: 'projectTypeCache',
      data: resultlist.data,
      success: function() {
        if(typeof(func)=="function")
        {
          func();
        }
      }
    });
  });
},
/**
*@description 初始化公司部门数据列表(选人使用) IsMulti 0为单选 1为多选
*/
InitUserListInfo:function(that,app,func)
{
  var params={
        firmId: app.getuserinfo().firmId
    };
  // 初始化公司部门数据列表
  app.AjaxReady(that,app.APIURL.GetHasRightCompanyAndDeptListAll,"GET",params,function(resultlist){
    dd.setStorage({
      key: 'UserInfoDeptAndComPanyCache',
      data: resultlist.data,
      success: function() {
        if(typeof(func)=="function")
        {
          func();
        }
      }
    });
  });
},
/**
*@description 获取全部人员数据
*/
InitUserAllInfo:function(that,app,func)
{
  var params={
        firmId: app.getuserinfo().firmId
    };
  // 初始化公司部门数据列表
  app.AjaxReady(that,app.APIURL.GetFirmUsers,"GET",params,function(resultlist){
    dd.setStorage({
      key: 'UserInfoAllCache',
      data: resultlist.data,
      success: function() {
        if(typeof(func)=="function")
        {
          func();
        }
      }
    });
  });
},
/**
*@description 通用获取列表
*/
InitPageList:function(that,app,apiurl,params,func)
{
    //通用获取列表
    app.AjaxReady(that,apiurl,"GET",params,func);
},
/**
*@description 提交表單
*/
  InitSubmitPage: function(that, app, apiurl, params, func, fail, typesettotal)
{
    if (typesettotal!=false)
    {
      typesettotal=true;
    }
    app.AjaxReady(that, apiurl, "POST", params, func, fail, typesettotal);
},
/**
*@description 获取数据请求
*/
IntiContent:function(that,app,apiurl,params,func)
{
  app.AjaxReady(that,apiurl,"Get",params,func);
},
/**
 *@description 获取联系方式
 */
IntiLinkWayList:function(that,app){
  var linkwaylist=app.allFollowUpWay;
  var list=[];
  for(var i=0;i<linkwaylist.length;i++)
  {
    list.push({text:linkwaylist[i].title,value:linkwaylist[i].id});
  }
  that.setData({
    'linkway.data':list
  });
},
/**
 *@description 时间选择控件,底部弹起
 */
IntiDatePicker:function(that,starttime,endtime,curdate){

 var year=parseInt(curdate.split('-')[0]);
 var month=parseInt(curdate.split('-')[1]);
 var day=parseInt(curdate.split('-')[2]);
 var startdate=new Date(starttime);
 var startyear=startdate.getFullYear();
 var startmonth=startdate.getMonth()+1;
 var startday=startdate.getDate();
 var enddate=new Date(endtime);
 var endyear=enddate.getFullYear();
 var endmonth=enddate.getMonth()+1;
 var endday=enddate.getDate();
 var yearlist=[];
 for(var i=startyear;i<=endyear;i++)
 {
   yearlist.push(i);
 }
  var daylist=[];
  var maxday=30;
  if('1,3,5,7,8,10,12'.indexOf(month)>-1&&month!=2)
  {
    maxday=31;
  }
  else if('4,6,9,11'.indexOf(month)>-1)
  {
    maxday=30;
  }
  else if(year%4==0&&month==2)
  {
     maxday=28;
  }
  else if(year%4>0&&month==2)
  {
     maxday=29;
  }
 for(var i=1;i<=maxday;i++)
 {
   daylist.push(i);
 }
 if(that.data.DatePicker.year.length==0)
 {
   that.setData({
   "DatePicker.year":yearlist
   });
 };
 if(maxday<day)
 {
   day=maxday;
 }
 that.setData({
   "DatePicker.day":daylist,
   "DatePicker.val":[year-startyear,month-1,day-1]
 });
}

}