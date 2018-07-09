/**
 * Created by Administrator on 2018/7/9.
 */
'use strict';
const pageName = 'string test';

const com = require('../com');

const string = com.string;

const[err,r] =string.getNonce(10);

console.log(r);

const [er,has]=string.hasMobilePhone('81860755818');
console.log(has);


const [e,s]=string.trimAllBlank('blf  孟   会   强  186 0755 8188 ');
console.log(s);