/**
 * Created by Administrator on 2018/7/9.
 */
'use strict';
const pageName = 'redis test';

const com = require('../com');

const redis = com.redis;


redis.getkey("moon" , (err,result) => {
    if (err) {return console.log(err)}
    console.log(result);
});