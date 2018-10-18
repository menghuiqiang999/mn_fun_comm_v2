/**
 * Created by Administrator on 2018/6/18.
 */
'use strict';
const pageName = 'dbTest';

const options = {
    url :  "mongodb://localhost:27017",
    dbName : "dbTest",
    collectionName : "booklist"
};

const content = '孟 会 强 186 0755 8188';
const com=require('./../com');
const  mongodb = new com.Mongodb;




const  document = {
    corpId : "123456789" ,
    user : "menghuiqiang2" ,
    content:content ,

    timestamp :  Date.now()
};
const whereStr= {trimContent:/孟会强/};
const sortStr = {"timestamp" : -1};


mongodb.setOptions(options);




mongodb.insert(document,(err,result) => {
    if(err) {console.log(err)}
    console.log(result)
});



mongodb.find(whereStr,(err,result ) => {
    if(err) {console.log(err)}
    console.log(result)
});



mongodb.findSort(whereStr,sortStr,(err,result ) => {
    if(err) {console.log(err)}
    console.log(result)
});




const aggregationArray = [{$sort:{user:-1,timestamp:1}},{$group:{_id:"$user",content:{$first:"$content"},timestamp:{$first:"$timestamp"}}}];

mongodb.aggregate(aggregationArray,(err,result ) => {
    if(err) {console.log(err)}
    console.log(result)
});

