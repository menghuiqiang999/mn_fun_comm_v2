/**
 * Created by Administrator on 2018/7/11.
 */
//----------------------------------------------------------------------------------------------------------------------
// download file
var request = require('request');
var fs = require('fs');
// dir是针对本目录的相对目录
class DownFile {
    constructor(){}
    setDownloadDir(dir){
        this.dir = dir;
    }
    download (url,callback){
        request.head(url,function(err,res,body){
            if(err){
                return callback(err);
            }

            const dir= this.dir || './';

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
}
module.exports = DownFile;
