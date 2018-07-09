/**
 * Created by Administrator on 2018/6/19.
 */
'use strict';
const pageName= 'string';

const string= new Object();
module.exports = string;
string.trimAllBlank = function(str) {
    const reg = /\s/g;
    const trimsStr = str.replace(reg,'');
    return [null,trimsStr];
};

string.hasMobilePhone =function(str) {
    const reg= /(1[3584]\d{9})/g;
    const has = reg.test(str);
    return [null,has];
};

//把第一个字母小写
string.firstLowerCase = function (str){
    const first = str[0].toLowerCase();
    const other = str.slice(1,str.length);
    const result = first.concat(other);

    return [null,result];
};


/**
* @param len {integer } must > 1
* @return getRandChar - rand char , len digit
* @example
*
* var len = getRandChar(16);
*
*/
string.getRandChar = function (len) {
    var chars ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (len > 1){
        var maxPo = chars.length;
        var randChar = '';
        for (var i =0; i< len ;i ++ ) {
            randChar += chars.charAt(Math.floor(Math.random()*maxPo));
        };
        return [null,randChar];
    };
};

/**
 *
 * @param len
 * @returns {number} - ruturn a rand number, the number of digits is len
 * @example
 * var nonce = getNonce(10);
 */
string.getNonce = function (len) {
    var rand = Math.random();
    while (rand < 1) {
        rand = rand * 10;
    };
    for (var i=0;  i < len-1; i ++){
        rand=rand * 10;
    };
    rand=Math.floor(rand);
    return [null,rand];
};