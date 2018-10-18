/**
 * Created by Administrator on 2018/7/11.
 */
'use strict';
const pageName = 'Https';
const https= require('https');
class Https {
    constructor(){};
    setPort(port){
        this.port = port;
    }
    setHeaders (headers){
        this.headers = headers;
    }
    setContentType (contentType){
        this.contentType=contentType;
    }
    post(host,path,content,callback){
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
        if (headers ) {
            options.headers = headers
        }
        let data = "" ;

        const req = https.request(options, function (res) {
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
    }

    get(host,path,callback){
        const port = this.port || 443 ;
        let options = {
            host: host ,
            port: port ,
            path: path ,
            method: 'GET'
        };

        let data = "" ;

        const req = https.get(options, function (res) {
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
    }
}
module.exports = Https;