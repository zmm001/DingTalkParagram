export default {
  data: {
    proCodeList: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
      "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
      "津", "贵", "云", "桂", "琼", "青", "新", "藏",
      "蒙", "宁", "甘", "陕", "闽", "赣", "湘"]
    ,
    defaultProCode: "京",
    proCodeIsShow: false
  },
  funcs: {
    //获取选中内容
    getProCode(e) {
      let index = e.currentTarget.dataset.idx;
      this.setData({
        proCodeIsShow: !this.data.proCodeIsShow,
        defaultProCode: this.data.proCodeList[index]
      });
    },
    //显示控件
    showProCode() {
      this.setData({ proCodeIsShow: !this.data.proCodeIsShow });
    }
  }
}