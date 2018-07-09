/**
 * Created by Administrator on 2018/4/26.
 * @module md5   - the result is UperCase
 * @param input - need to be md5
 * @param callback
 * @returns callback - (err,output)
 * @example
 * md5(input,function(err,output){
 *
 * };
 */
'use strict';
var page_name="md5";


var crypto = require('crypto');

var md5 = function (input,callback){
    var md5 = crypto.createHash('md5');
    md5.update(input);
    var str = md5.digest('hex');
    var output= str.toUpperCase();  //32位大写
    callback(null,output);
};

module.exports=md5;