const fs = require('fs');
const path = require('path');
let db = require('../config/products.json');

module.exports = {
    create(product,callback){
        db.push(product);

        fs.writeFile(
            path.join(__dirname,'/../config/products.json'),
            JSON.stringify(db), callback);
    },
    getAll(){
        return db;
    },
    getOne(id){
        return db.find(x => x.id == id);
    }
}