/**
 * Created by Administrator on 2018/5/21.
 */
'use strict';

var pageName = 'fileTest';

var com=require('./../com');

var imagesUrl= 'http://turing-chat.oss.tuling123.com/ef639ff694b75cf6b56f55574777c4e4.jpg' ;
const httpx = com.httpx;

httpx.downloadFile(imagesUrl,(err,result) => {
    if(err) {console.log(err)}
    console.log(result);
});


//----------------------------------------------------------------------------------------------------------------------
//Test downUpload
/*
var imagesUrl= 'http://turing-chat.oss.tuling123.com/ef639ff694b75cf6b56f55574777c4e4.jpg' ;
var downUploadFile = com.http.file.downUpload;
var dir = './' ;
var fileName = '9a4dba08f2232fb32b8d1235c1f0a3bfb9732c34.jpg';

downUploadFile(imagesUrl,url,nameType,fileName,function(err,result){
    console.log(pageName, ':result:' ,result);
});
*/
//file.downUpload = function (urlDownload,urlUpload,fieldName,dir,fileName) {
