#This is a function from Moonlight
#Quick Start
##install
    npm install mn_fun_comm_v2 --save
##Basic Usage

##string

###trimAllBlank

参数：str

去掉str前后的空格

return : [err,trimStr] :错误或去掉空格后的 string

example

    const [err,trimStr] = string.trimAllBlank(str);

###hasMobilePhone

参数：str

判断str是不是一个手机号码。如果是返回true,否则返加false

example

    const [err,has]= string.hasMobilephone(mobile);

###firstLowerCase

参数:str

把str的第一个字母小写。

example

    const[err,firstLowerCaseString] = string.firstLowerCase(str)

###getNonce

param len

returns {[null,number]}

example

    const com = require('mn_fun_comm_v2');
    const string = com.string;
    const [err,nonce] = string.getNonce(10);

###getRandChar



param len {integer } must > 1

return getRandChar - rand char , len digit

example

    const [err,str] = string.getRandChar(16);




##crypto
###aes
####encrypto
>加密方法

>param data     需要加密的数据 encoding:utf8

>param key 加密key

>param iv       向量

>returns string  format:base64

    var encrypted = encrypto (data,key,iv);

####encryptoPkcs7

输入buf   对buffer 进行pkcs7方式进行补位，然后进行aes -256- cbc 方式
进行加密
param bufData
param key  - 加密Key
param iv  - 矢量
returns crypted   加密后的字符串base64编码。
example:

    const com =  require('mn_fun_comm');
    const encrypto = com.crypto.aes.encryptoPkcs7;
    const encrypted1 = encrypto(buf,bAesKey,bIv);



####decrypto

解密方法

>param crypted  密文  format: base64

>param key      解密的key

>param iv       向量 *

>returns string  format:utf8

>example

    var decrypted = decrypto (crypted,key,iv);

####decryptoPkcs7
输入buffer ,  对buffer 进行AES解密，然后按pkcs7方式支除补位
param encrypted  {buffer} -需要解的buffer
param key
param iv
returns 如果解密过程发生错误，返回错误，如果没有错误发生，err 为null, 返回正确的buf{buffer}
example:

    const decrypto= com.crypto.aes.decryptoPkcs7;
    const com =  require('mn_fun_comm');
    const [err,buf] =decrypto(encrypted,bAesKey,bIv);
        if (err) {
            return console.log(err);
        }
    console.log(buf);


###md5
module md5   - the result is UperCase

param input - need to be md5

param callback

returns callback - (err,output)

example

    md5(input,function(err,output){
        ......
    };




###sha
####sha1
param content - Need to sha1

returns d {string} - Returns  the result of sha1

example

    var encryped = sha (content);

##http or https

httpx include http and https,such as:

    const com= require("mn_fun_comm_v2");

    const Http = com.Http;

    const Https = com.Https;

    const http= new Http();

    const https= new Https();

    https.get(...)  or http.get(...)





###get

param host - such as  qyapi.weixin.qq.com

param path   - such as /cgi-bin/uer/get?access_token=ACCESS_TOKEN ......

param data_callback

example

    httpx.get(host,path,function(err,result){
          ......
    });


###post

param host - Such as  qyapi.weixin.qq.com

param uri - Such as /cgi-bin/uer/get?access_token=ACCESS_TOKEN ......

param content

param callback

example

    var host = "qyapi.weixin.qq.com";
    var url = "/cgi-bin/user/create?access_token=" + access_token;
    var content=JSON.stringify(data);
    httpx.post (host,path,content,function(err,result){
        ......
    });

###File.download

down a file from the url, and save it in the dir

param url {string}    such as : http://www...........output.jpg

param dir {string}   - the dir you want to save this file

param fileName {string} - the file name you want to save

example

    const com= require("mn_fun_comm_v2");

    const File= com.File;

    const file= new File();

    file.download(url,(err,result) => {  } );

##Mongodb

###Method insert

options 为数据库的参数，如下样例：

    const options = {
        url :  "mongodb://localhost:27017",
        dbName : "booklist",
        collectionName : "booklist"
    };

document 为要插入的文档，如下样例：

    const  document = {
        corpId : "123456789" ,
        user : "menghuiqiang2" ,
        content:content ,
        trimContent: trim(content) ,
        timestamp :  Date.now()
    };


    mongodb.setOptions(options);

    mongodb.insert(document,(err,result) => {
        if (err) {
            conssole.log(err);
        }
        console.log(result);
    });
###Method find

whereStr为查询条件，样例如下：

    const whereStr= {trimContent:/孟会强/};


   mongodb.find(whereStr,(err,result) => {
       if (err) {conssole.log(err)}
       console.log(result);

   })

###Method findSort

sortStr为排序条件，样例如下：


    mongodb.findSort(wheereStr,sortStr,(err,result) => {
        if (err) {conssole.log(err)}
        console.log(result);

    });

###Method Aggregate

    const aggregateArray = [{$sort:{user:-1,timestamp:1}},{$group:{_id:"$user",content:{$first:"$content"},timestamp:{$first:"$timestamp"}}}];

    mongodb.aggregate(aggregateArray,(err,result) => {
        if (err) {
            conssole.log(err);
        }
        console.log(result);
    });

##Redis


    var com = require('mn_fun_comm_v2');
    var redis =com.redis;

####set_key:
    redis.setex_key(key,seconds,value);    //Such as redis.setex_key(key,7200,access_token);     // 7200seconds

    //put value in redis by key_name key, expire time seconds.

####get_key:
get a value from redis by the key_name key, the value callback in the result.

if result is NULL, is means that there is not a vaule in redis by the key_name key.

Such as:

    redis.getkey(key,function(err,result){
       ......
    });

####expire_time

设置Key的过期时间，为秒为单位。

Such as:

    redis.getkey(key,seconds);




##time
###format_time
####formatDate
param timeMs - Input mileSeconds from 1970-1-1 00:00:00
returns {string}- Such as :2018-06-21
example

   const [err,date] = time.formatDate(timeMs);

date 输出 :2018-06-21

###formatTime
param timeMs - Input mileSeconds from 1970-1-1 00:00:00
returns {string}- Such as :2018-06-21 12:34:05
example

   const [err,time] = formatTime(timeMs);

###Timestamp
返回当前时间的秒数或毫秒数
example

    time.timestampMs();    //返回毫秒 mileSeconds from 1970-1-1 00:00:00
    time.timestampS();     //返回秒数 Seconds from 1970-1-1 00:00:00