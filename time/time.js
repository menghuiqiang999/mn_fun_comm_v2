/**
 * Created by Administrator on 2018/5/14.
 */
'use strict';
var pageName = 'time';




const time = new Object();

module.exports = time;

time.timestampMS = function(){
    return [null,Date.now()]
};

time.timestampS = function() {
    return [null,Math.floor(Date.now()/1000)];
};


time.formatDate = function  (timeMs) {
    const time = new Date(timeMs);   //毫秒
    const year = time.getFullYear();
    const month = time.getMonth()+1;
    const date = time.getDate();
    const result = year + '-' + twoDigit(month) + '-' + twoDigit(date) ;
    return [null,result];
};

time.formatTime = function (timeMs) {
    const [err,date] =this.formatDate(timeMs);
    const time = new Date(timeMs);   //毫秒
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const result =date + ' ' + twoDigit(hour) + ':'+ twoDigit(minute) + ':' +twoDigit(second);
    return [null, result] ;
};



function twoDigit(x) {
    return x < 10 ?  '0' + x : x ;
}