import {getData,getAd} from "search_api.js";
Page({
  data: {
    placeholer: '请输入小区名或地址',
    adList:[],
    history:[],
    searchList:[],
    clearShow:false,
    search:''
  },
  onLoad:function(){
    this.getAd();
    this.getHistory();
  },
  /**
   * 获取广告
   */
  getAd:function(){
    getAd().then(respone=>{
      this.setData({      
        adList: respone.content
      });   
    });
  },
  /**
   * 搜索信息
   * 
   * @param {*} e 
   */
  doSearch:function(e){
    this.setData({
      search :e.detail.value.trim()
    });
    if(this.data.search){
      let searchData = {
        "search":this.data.search,
        "page":0,
        "pageSize":20,
        "key":2
      };
      getData(searchData).then(response=>{
        this.setData({
          adList:[]
        });
        console.log(response);
        if(response.content){
          response.content.forEach(item=>{
            if(item.address!=undefined&&item.address!=null){
              item.address = this.getHighLight(item.address);
            }        
            item.title = this.getHighLight(item.title);         
          });
          this.setData({
            searchList:response.content,
            clearShow:true
          });
        }
      });
    }else{
     this.doClear();
    }
  },
  /**
   * 搜索的历史记录
   */
  getHistory:function(){
    this.history=wx.getStorageSync("search_his");
    if(this.history){
      close.log(this.history);
    }
  },
  getHighLight:function(str){
    let result=[];
    if(str!=null&&str.length>0){
      let first= str.split("<i>");
      let i = 0;
      first.forEach(f=>{
        if(f.indexOf("</i>")>0){
          let second = f.split("</i>");
          result.push({"value":second[0],"highLight":true});
          result.push({"value":second[1],"highLight":false});
        }else{
          if(f!=null&&f!=''){
            result.push({"value":f,"highLight":false});
          }          
        }
      });
    }
    return result;
  },
  doClear:function(){
    this.setData({
      adList:this.getAd(),
      history:this.getHistory(),
      searchList:[],
      clearShow:false,
      search:''
     });
    
  }
})

