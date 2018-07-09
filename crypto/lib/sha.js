/**
 * Created by Administrator on 2018/5/11.
 * @module sha - return sha result *
 *
 */

'use strict';
var pageName = 'sha';
var sha = function () {};

/**
 *
 * @param content - Need to sha1
 * @returns d {string} - Returns  the result of sha1
 * @example
 * var encryped = sha (content);
 */

sha.sha1 = function (content){


    var crypto = require('crypto');
    var sha = crypto.createHash('sha1');
    sha.update(content);
    var d = sha.digest('hex');
    return d;
};

module.exports = sha;