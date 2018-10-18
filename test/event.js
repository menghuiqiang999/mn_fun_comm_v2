/**
 * Created by Administrator on 2018/7/11.
 */
'use strict';
const pageName = 'event test';

const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();




const listener2 = function listener2(x,y){


    console.log(x,y,' = ',x+y);
};


eventEmitter.addListener('connection',listener2);


eventEmitter.emit('connection',2,3);




