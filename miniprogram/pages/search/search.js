import { getData } from "search_api.js";
Page({
  data: {
    placeholer: '请输入小区名或地址'
  },
  onLoad:function(){
    this.getAd();
  },
  getAd:function(e){
   
    if(e){
      var l  = e.currentTarget;
      this.setData({
        placeholer: l.dataset.text
      });
    }
  },
  doSearch:function(e){
    let a = e||'请输入小区名或地址';
    var search  = e.detail.value.trim();
    let searchData = {
      "search":search,
      "page":0,
      "pageSize":20,
      "key":2
    };
    getData(searchData).then(respone=>{
      console.log(respone);
    });
  }
})

