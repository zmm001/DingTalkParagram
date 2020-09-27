let app = getApp()
Page({
  data: {
    model:{
      productId:'',
      unit:'',
      price:0,
      issn:'',
      brandName:'',
      serviceLife:'',
      productName:'',
      productModel:'',
      productNum:0
    },
    editId:'',
    editproduct:'',
  },
  onLoad(request) {
     if(request.productId!=null)
     {
        this.setData({
          "model.productId":request.productId,
          "model.unit":request.unit,
          "model.price":request.price,
          "model.issn":request.issn,
          "model.brandName":request.brandName,
          "model.serviceLife":request.serviceLife,
          "model.productName":request.productName,
          "model.productModel":request.productModel,
          "model.productNum":request.productNum,
          editId:request.id,
          editproductid:request.productId
        });
     }
     else{
       this.setData({
          editId:'',
          editproductid:''
       });
     }
  },
  onShow(){},
  //文本变换赋给实体值
  getinputvalue:function(e){
   var name= e.currentTarget.dataset.name;
   var value=e.detail.value;
   var data=this.data.model;
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
  openProductList:function(){
    const page = '../ProductList/ProductList';
      dd.navigateTo({ url: page });
  },
  submitsave:function(){
    var flag=app.valueVerification(this.data.model.productId,null,null,null,"请选择产品");
    if(flag)
    {
      flag=app.valueVerification(this.data.model.serviceLife,null,null,null,"服务期限不可为空");
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.model.price,null,null,"int","单价需大于0");
    }
    if(flag)
    {
      flag=app.valueVerification(this.data.model.productNum,null,null,"int","数量需大于0");
    }
    if(flag)
    {
      var model=this.data.model;
      var pages=getCurrentPages();
      var productdatalist= pages[pages.length-2].data.productlist.data;
      var oldeditId=pages[pages.length-2].data.productlist.editIds;
      var newproductdatalist=[];
      if(app.vnull(oldeditId))
      {
        oldeditId+=",";
      }
      var isadd=true;
      var totalmoeny=0;
      //默认执行修改改操作
      for(var i=0;i<productdatalist.length;i++)
      {
        
        if(app.vnull(productdatalist[i].id)&&productdatalist[i].id==this.data.editId)
        {
          newproductdatalist.push({
            "id":this.data.editId,
            "productId":model.productId,
            "unit":model.unit,
            "singlePrice":model.price,
            "issn":model.issn,
            "brandName":model.brandName,
            "serviceLife":model.serviceLife,
            "productName":model.productName,
            "productModel":model.productModel,
            "productNum":model.productNum,
            "minPrice":(parseFloat(model.price)*model.productNum).toFixed(2)
          });
          totalmoeny=(parseFloat(totalmoeny)+parseFloat(model.price)*model.productNum).toFixed(2);
          pages[pages.length-2].setData({
            "project.editIds":oldeditId+this.data.editId
          });
          isadd=false;
        }
        else if(productdatalist[i].productId==model.productId)
        {
            newproductdatalist.push({
              "id":'',
              "productId":model.productId,
              "unit":model.unit,
              "singlePrice":model.price,
              "issn":model.issn,
              "brandName":model.brandName,
              "serviceLife":model.serviceLife,
              "productName":model.productName,
              "productModel":model.productModel,
              "productNum":model.productNum,
              "minPrice":(parseFloat(model.price)*model.productNum).toFixed(2)
            });
            totalmoeny=(parseFloat(totalmoeny)+parseFloat(model.price)*model.productNum).toFixed(2);
            isadd=false;
        }
        else {
            //该情况为正常旧数据
            newproductdatalist.push({
            "id":productdatalist[i].id,
            "productId":productdatalist[i].productId,
            "unit":productdatalist[i].unit,
            "singlePrice":productdatalist[i].singlePrice,
            "issn":productdatalist[i].issn,
            "brandName":productdatalist[i].brandName,
            "serviceLife":productdatalist[i].serviceLife,
            "productName":productdatalist[i].productName,
            "productModel":productdatalist[i].productModel,
            "productNum":productdatalist[i].productNum,
            "minPrice":productdatalist[i].minPrice
            });
            totalmoeny=(parseFloat(totalmoeny)+parseFloat(productdatalist[i].minPrice)).toFixed(2);
        }
      }
      //检测到无修改再执行添加操作
      if(newproductdatalist.length==0||isadd)
      {
        newproductdatalist.push({
          'id':'',
          "productId":model.productId,
          "unit":model.unit,
          "singlePrice":model.price,
          "issn":model.issn,
          "brandName":model.brandName,
          "serviceLife":model.serviceLife,
          "productName":model.productName,
          "productModel":model.productModel,
          "productNum":model.productNum,
          "minPrice":(parseFloat(model.price)*model.productNum).toFixed(2)
        })
        totalmoeny=(parseFloat(totalmoeny)+parseFloat(model.price)*model.productNum).toFixed(2);
      }
      pages[pages.length-2].setData({
          "productlist.data":newproductdatalist,
          "project.data.estimatePrice":parseFloat(totalmoeny).toFixed(2)
      });
      dd.navigateBack({
      delta: 1
      });
    }
  }
});
