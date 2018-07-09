/**
 * Created by Administrator on 2018/5/11.
 */

'use strict';
var pageName = 'aes';

var crypto = require('crypto');
var aes = function() {};
module.exports =aes;
/**
 * 加密方法
 * @param data     需要加密的数据 encoding:utf8
 * @param key 加密key
 * @param iv       向量
 * @returns string  format:base64
 * @example
 * var encrypted = encrypto (data,key,iv);
 *
 */
aes.encrypto = function (data,key, iv) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(true);
    var crypted = cipher.update(data, 'utf8', 'base64');
    crypted += cipher.final('base64');

    return crypted;
};

/**
 * 解密方法
 * @param crypted  密文  format: base64
 * @param key      解密的key
 * @param iv       向量 *
 * @returns string  format:utf8
 * @example
 * var decrypted = decrypto (crypted,key,iv);
 *
 */
aes.decrypto = function ( crypted , key, iv) {

    try {
        var algorithm = 'aes-256-cbc' ;
        var decipher = crypto.createDecipheriv(algorithm , key, iv);
        decipher.setAutoPadding(true);
        var decoded = decipher.update(crypted, 'base64', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }
    catch (err) {
        console.log(pageName,'---There is an error at decrypto---',err);
    }


};

aes.decryptoPaddingFalse = function ( crypted , key, iv) {

    try {
        var algorithm = 'aes-256-cbc' ;
        var decipher = crypto.createDecipheriv(algorithm , key, iv);
        decipher.setAutoPadding(false);
        var decoded = decipher.update(crypted, 'base64', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }
    catch (err) {
        console.log(pageName,'---There is an error at decrypto---',err);
    }

};


aes.decryptoAes256Cbc = function(crypted , key , iv , callback){
    var algorithm = 'aes-256-cbc' ;
    decrptoFun( algorithm ,crypted , key , iv , callback);
};

function decrptoFun  (algorithm , crypted , key , iv , callback ) {
    try {
        var decipher = crypto.createDecipheriv(algorithm , key, iv);
        decipher.setAutoPadding(false);
        var decoded = decipher.update(crypted, 'base64', 'utf8');
        decoded += decipher.final('utf8');
        //console.log(pageName, '-----decoded----', decoded);
        callback (null,decoded) ;
    }
    catch (err) {
        callback(err);
    }
}

//------------------------------------------------------------------------------

const blockSize = 32 ;

class Pkcs7Encoder  {
    //---------------------------------------------------------------------------
//输入一个buffer, buffer 的位数除blockSize, 余数不足32位的，补足32位，
// 补足位数的字符为所缺位数的数字（16进制），返回所补足位数的buffer.
    /**
     *
     * @param buf
     * @returns  {buffer}
     */
    encode(buf){
        const  bufLength = buf.length;
        //console.log('----buf.length---' , bufLength);
        const padLength =  blockSize - bufLength % blockSize ;
        const padHex = padLength.toString(16);
        const padBuf = Buffer.alloc(padLength);
        for (var i =0 ; i < padLength; i ++){

            padBuf.write(padHex,i,1,'hex');
        }
        //console.log(padBuf);


        return Buffer.concat([buf,padBuf]);
    }
    //----------------------------------------------------------------------------
    /**
     * 根据最后一位的数字（16进制），确定原来所补的位数，去掉加密前所补
     * 的位数，返回。
     * @param buf
     * @returns {buffer} -去掉原先补位后的buffer
     */

    decode(buf){

        var padB = (buf.slice(-1)).toString('hex');
        var pad  = parseInt(padB,16);
        //console.log('----pad---' ,padB,pad);
        if (pad <1 || pad > blockSize){
            pad =0;
        }
        var b = buf.slice(0,buf.length-pad);
        //console.log(b.slice(-32));
        return b;
    }
}

/**
 * 输入buf   对buffer 进行pkcs7方式进行补位，然后进行aes -256- cbc 方式
 * 进行加密
 * @param bufData
 * @param key  - 加密Key
 * @param iv  - 矢量
 * @returns  crypted   加密后的字符串base64编码。
 * @example
 *      const com =  require('mn_fun_comm');
 *      const encrypto = com.crypto.aes.encryptoPkcs7;
  *     const encrypted1 = encrypto(buf,bAesKey,bIv);
 *
 */
aes.encryptoPkcs7 = function (bufData,key, iv) {
    const pkcs7Encoder = new Pkcs7Encoder();
    const algorithm = 'aes-256-cbc' ;

    //console.log(bufData);
    const buf = pkcs7Encoder.encode(bufData) ;
    //console.log(buf);
    //console.log('----bufdata.length---', bufData.length, '----buf.length---', buf.length);
    //console.log(buf.slice(-32));
    const cipher = crypto.createCipheriv(algorithm , key, iv);
    cipher.setAutoPadding(false);
    var crypted = cipher.update(buf, 'hex', 'base64');
    crypted += cipher.final('base64');

    return crypted;
};
//------------------------------------------------------------------------------
/**
 * 输入buffer ,  对buffer 进行AES解密，然后按pkcs7方式支除补位
 * @param encrypted  {buffer} -需要解的buffer
 * @param key
 * @param iv
 * @returns  [err, buf]  - 如果解密过程发生错误，返回错误，如果没有错误
 * 发生，err 为null, 返回正确的buf{buffer}
 * @example
 *
 * const decrypto= com.crypto.aes.decryptoPkcs7;
 * const com =  require('mn_fun_comm');
 * const [err,buf] =decrypto(encrypted,bAesKey,bIv);
 *  if (err) {
 *     return console.log(err);
 *  }
 *  console.log(buf);
 */
aes.decryptoPkcs7= function(encrypted, key, iv) {
    try{

        const pkcs7Encoder = new Pkcs7Encoder();
        const algorithm = 'aes-256-cbc' ;
        const decipher = crypto.createDecipheriv(algorithm , key, iv);
        decipher.setAutoPadding(false);
        var decoded = decipher.update(encrypted, 'base64', 'hex');
        decoded += decipher.final('hex');
        const bufDecoded = (Buffer.from (decoded,'hex'));
        //console.log (pageName, '-----bufDecoded.length----' , bufDecoded.length);
        //console.log(bufDecoded);
        const buf =pkcs7Encoder.decode(bufDecoded) ;
        //console.log('----decrypto --- buf.length', buf.length)

        return [null,buf];

    }catch (err){
        return(err);
    }
}