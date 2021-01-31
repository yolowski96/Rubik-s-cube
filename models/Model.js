const fs = require('fs/promises');
const path = require('path');
let db = require('../config/products.json');

class Model{
    save(){
        db.push(this);

        return fs.writeFile(
            path.join(__dirname,'/../config/products.json'),
            JSON.stringify(db));
    }

    static getAll(){
        return db;
    }

    static getOne(id){
        return db.find(x => x.id == id);
    }
}

module.exports = Model;