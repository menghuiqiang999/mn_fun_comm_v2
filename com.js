/**
 * Created by Administrator on 2018/4/26.
 * 
 */
'use strict';
var pageName="com";



var crypto = require('./crypto/crypto');
exports.crypto = crypto;


var httpx = require('./httpx/httpx');
exports.httpx = httpx;




const mongodb = require('./mongodb/mongodb');
exports.mongodb = mongodb;


var redis = require('./redis/redis');
exports.redis = redis;

exports.string = require('./string/string');
exports.time= require('./time/time');