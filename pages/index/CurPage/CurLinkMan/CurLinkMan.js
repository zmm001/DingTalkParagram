import ajaxInti from '../../../CommonComponent/ajaxlist.js';
let app = getApp()
Page({
  data: {
    LinkData:{
      oncheck:"curDetail",
      data:[]
    },
    custId:'',
    isEndPreson:false//false为直营客户,true为选择最终客户联系人
  },
  onLoad(request) {
    if(request.id!=null&&request.id.length>0)
    {
      this.setData({
        custId:request.id,
        isEndPreson:(request.EndPreson=="true"?true:false),
        "LinkData.data":[]
      })
      this.getLinkData();
    }
  },
  getLinkData:function(){
      var param={
        firmId: app.userinfo.firmId,
        custId: this.data.custId
      };
      var that=this;
      ajaxInti.InitPageList(that,app,app.APIURL.GetLinkManList,param,function(resultlist){
          var linsData=that.data.LinkData.data;
          var dataJson=resultlist.data;
          for(var i=0;i<dataJson.length;i++)
          {
              linsData.push(
                {
                  id:dataJson[i].id,
                  linkName:dataJson[i].fullName,
                  phoneNum:dataJson[i].phoneNum,
                  tel:dataJson[i].tel
                });
          };
          that.setData({
            "LinkData.data":linsData,
          });
          
      });
  },
  //选择一个人员返回参数
  curDetail:function(e){
    var pages=getCurrentPages();
    var tel=e.currentTarget.dataset.tel;
    if(tel!=null&&tel>0)
    {
      tel=e.currentTarget.dataset.phoneNum;
    }
    if(this.data.isEndPreson)
    {
      pages[pages.length-2].setData({
        "backparam.endLinkMan":e.currentTarget.dataset.linkMan,
        "backparam.endTel":tel
      })
    }else{
      pages[pages.length-2].setData({
        "backparam.linkMan":e.currentTarget.dataset.linkMan,
        "backparam.tel":tel
      })
    }
    dd.navigateBack({
    delta: 1
    });
  }
});
