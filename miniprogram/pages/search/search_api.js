var request = require( "../../components/chatroom/request.js");
var postHeader = {
  'content-type': 'application/x-www-form-urlencoded'
}
module.exports={
  "getAd":function(data){
    let url = "/apiv1/house/viewHotSubRank";
    return request.post(url,data,postHeader);                   
  },
  "getData":function(data){
    let url = "/apiv1/base/new_searchIndex";
    return request.post(url,data,postHeader);                   
  }
}