import tcity from '../citys.js';
export default{
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
    selval:"",
    isShow: false,
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
       this.setData({
         selval:cityData[val[0]].sub[val[1]].sub[this.data.values[2]].code
       });
    }
  },
  close(){
     this.setData({
      isShow:!this.data.isShow
    })
  },
  onLoad() {
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
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
      'province':cityData[0].name,
      'city':'',
      'county':'',
      'areatext':cityData[0].name
    })
  },
};
