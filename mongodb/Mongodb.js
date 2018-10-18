/**
 * Created by Administrator on 2018/7/9.
 */
'use strict';
const pageName = 'Mongodb';
const mongoClient =  require ('mongodb').MongoClient;



class Mongodb {
    construtor (){}
}

module.exports = Mongodb;



Mongodb.prototype.setOptions = function(options){
    const defaultUrl= 'mongodb://localhost:27017';
    this.options = {
        url : options.url || defaultUrl,
        dbName : options.dbName ,
        collectionName : options.collectionName
    };
};


Mongodb.prototype.insert = function(document,callback){
    const url = this.options.url;
    const dbName = this.options.dbName;
    const collectionName = this.options.collectionName;

    mongoClient.connect(url,(err,client) =>{

        if (err) { return callback (err)}
        const db = client.db(dbName);
        const col = db.collection(collectionName);
        col.insert(document,callback);
        client.close();
    });
};

Mongodb.prototype.find = function (whereStr,callback) {
    const url = this.options.url;
    const dbName = this.options.dbName;
    const collectionName = this.options.collectionName;

    mongoClient.connect(url,(err,client) =>{

        if (err) { return callback (err)}
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        col.find(whereStr).toArray(callback);

        client.close();
    });

};


Mongodb.prototype.findSort= function (whereStr,sortStr,callback) {
    const url = this.options.url;
    const dbName = this.options.dbName;
    const collectionName = this.options.collectionName;

    mongoClient.connect(url,(err,client) =>{

        if (err) { return callback (err)}
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        col.find(whereStr).sort(sortStr).toArray(callback);

        client.close();
    });

};

Mongodb.prototype.aggregate = function(aggregateArray,callback){

    const url = this.options.url;
    const dbName = this.options.dbName;
    const collectionName = this.options.collectionName;

    mongoClient.connect(url,(err,client) =>{

        if (err) { return callback (err)}
        const db = client.db(dbName);
        const col = db.collection(collectionName);

        col.aggregate(aggregateArray).toArray(callback);

        client.close();
    });

};