const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAll(query){
    let products = await Cube.find({}).lean();

    if(query.search){
        products = products.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if(query.from){
        products = products.filter(x => Number(x.level) >= query.from);
    }

    if(query.to){
        products = products.filter(x => Number(x.level) <= query.to);
    }

    return products;
}

function getOne(id){
    return Cube.findById(id).lean();
}

function create(data){
    let cube = new Cube(data);

    return cube.save();
}

function getOneWithAccessories(id){
    return Cube.findById(id).populate('accesories').lean();
}

async function attachAccessory(productId,accessoryId){
    let product = await Cube.findById(productId);
    let accessory = await Accessory.findById(accessoryId);

    product.accesories.push(accessory);
    return product.save();
}

module.exports = {
    create,
    getAll,
    getOne,
    attachAccessory,
    getOneWithAccessories,
};