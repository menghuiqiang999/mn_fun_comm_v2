/**
 * Created by Administrator on 2018/7/9.
 */
'use strict';
const  pageName = 'time test';

const com = require('../com');

const time = com.time;

const [err,t] =time.timestampMS();

const [e,tt]=time.formatDate(t);
console.log(tt);