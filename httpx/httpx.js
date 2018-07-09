/**
 * Created by Administrator on 2018/7/9.
 */
'use strict';
const pageName = 'httpx';

const httpx = new Object();
module.exports = httpx;
httpx.setProtocol = function(protocol){
    const p =protocol.toLowerCase();
    if (p === 'http' || p==='https'){
        this.protocol = p;
    }
    else{
        console.log(' check the protocol you have set !');
    }
};
httpx.setPort = function(port){
    this.port= port;
};

httpx.post = function(host,path,content,callback){
    let httpx;
    if (this.protocol ==='http'){
        httpx = require('http');
    }
    else {
        httpx = require('https')
    }
    const port = this.port || 443 ;
    const defaultContentType = 'application/json;charset=UTF-8';
    const contentType = this.contentType || defaultContentType;
    const defaultHeaders= { 'Content-Type': contentType , 'Content-Length': content.length};
    const headers = this.headers || defaultHeaders;
    let options = {
        host: host ,
        port: port ,
        path: path ,
        method: 'POST'
    };
    if (headers) {
        options.headers = headers
    }
    let data = "" ;
    const req = httpx.request(options, function (res) {
        res.on ('data', function (chunk) {
            data += chunk ;
        });
        res.on('end',function(){
            callback (null,data) ;
        });
        res.on('error',(e) => {
            callback(e);
        })
    });
    req.write(content) ;
    req.end() ;
};

httpx.get = function(host,path,callback){
    let httpx;
    if (this.protocol ==='http'){
        httpx = require('http');
    }
    else {
        httpx = require('https')
    }
    const port = this.port || 80 ;
    let options = {
        host: host ,
        port: port ,
        path: path ,
        method: 'GET'
    };

    let data = "" ;
    const req = httpx.get(options, function (res) {
        res.on ('data', function (chunk) {
            data += chunk ;
        });
        res.on('end',function(){
            callback (null,data) ;
        });
        res.on('error',(e) => {
            callback(e);
        })
    });
};
//----------------------------------------------------------------------------------------------------------------------
// download file
var request = require('request');
var fs = require('fs');

httpx.downloadFile = function(url,callback){
    request.head(url,function(err,res,body){
        if(err){
            return callback(err);
        }

        const dir= './';
        const path = require('path');
        const fileName= path.basename(url);
        const fn = fs.createWriteStream(dir + fileName);
        request(url).pipe(fn);
        fn.on('finish',function(){
            fs.stat(dir+fileName,(err,stats) => {
                if (err ) {return callback (err)}
                if (stats.isFile()) {
                    callback(null,dir+fileName);
                }
            })
        });
        fn.on('error', function (err) {
            return callback(err);
        })

    });
};
httpx.postBuffer= function(host,path,content,callback) {
    const buf =  Buffer.from(content,'utf8');
    let httpx;
    if (this.protocol ==='http'){
        httpx = require('http');
    }
    else {
        httpx = require('https')
    }
    const port = this.port || 443 ;
    const defaultContentType = 'application/json;charset=UTF-8';
    const contentType = this.contentType || defaultContentType;
    const defaultHeaders= { 'Content-Type': contentType , 'Content-Length': buf.length};
    const headers = this.headers || defaultHeaders;
    let options = {
        host: host ,
        port: port ,
        path: path ,
        method: 'POST'
    };
    if (headers) {
        options.headers = headers
    }
    let data = "" ;
    const req = httpx.request(options, function (res) {
        res.on ('data', function (chunk) {
            data += chunk ;
        });
        res.on('end',function(){
            callback (null,data) ;
        });
        res.on('error',(e) => {
            callback(e);
        })
    });
    req.write(buf) ;
    req.end() ;
};