/**
 * Created by Administrator on 2018/5/21.
 */
'use strict';

var pageName = 'fileTest';

var com=require('./../com');

var imagesUrl= 'http://turing-chat.oss.tuling123.com/ef639ff694b75cf6b56f55574777c4e4.jpg' ;
const file = new com.File;

file.download(imagesUrl,(err,result) => {
    if(err) {console.log(err)}
    console.log(result);
});

