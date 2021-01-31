const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('./helpers/productHelpers');
const router = Router();

router.get('/', (req,res) => {
    
    productService.getAll(req.query)
    .then(products => {
        console.log(products);
        res.render('home', {title: 'Browse',products})
    })
    .catch(() => res.status(500).end());
});

router.get('/create', (req,res) => {
    res.render('create', {title: 'Create'})
});

router.post('/create', validateProduct,(req,res) => {
    productService.create(req.body)
    .then(() => res.redirect('/'))
    .catch(() => res.status(500).end())
});

router.get('/details/:productId', async (req,res) => {
    let product = await productService.getOneWithAccessories(req.params.productId);

    res.render('details', {title:'Product Details',product})
});

router.get('/:productId/attach', async (req,res) => {

    let product = await productService.getOne(req.params.productId);

    let accessories = await accessoryService.getAllWithout(product.accesories);

    res.render('attachAccessory',{product,accessories});
})

router.post('/:productId/attach', (req,res) => {
    productService.attachAccessory(req.params.productId,req.body.accessory)
    .then(() => res.redirect(`/details/${req.params.productId}`))
});

module.exports = router;