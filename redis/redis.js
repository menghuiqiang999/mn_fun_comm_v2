/**
 * Created by Administrator on 2018/4/25.
 */
"use strict";
var pagName="redis";


const  redis = new Object();

module.exports = redis;


var RedisDb = require('ioredis');
var redisDb = new RedisDb();


/**
 *
 * @param key
 * @param value
 */


redis.setkey = function(key,value){
    redisDb.set (key,value);
};


/**
 *
 * @param key
 * @param seconds - Expire time
 * @param value
 */
redis.setex_key  = function(key,seconds,value){

    redisDb.setex (key,seconds,value);
};

/**
 *
 * @param key - key save in the redis
 * @param value_callback - value get back
 * @example
 * get(key,function(err,result){
 *      ......
 * });
 */
redis.getkey = function(key,callback) {

    redisDb.exists (key).then( function (exists_key) {

        if (exists_key){
            redisDb.get(key).then(function(result){
                callback(null,result);
            })
        }
        else{
            callback( 'Haven\'t found the key!',null);
        }
    });
};

/**
 *
 * @param key
 * @param expire_time_seconds
 */
redis.expire_time=function (key,expire_time_seconds){

    redisDb.expire (key,expire_time_seconds);
};
