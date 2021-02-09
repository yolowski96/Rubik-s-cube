const { Router, response } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const { validateProduct } = require('./helpers/productHelpers');
const router = Router();

router.get('/', (req,res) => {
    
    productService.getAll(req.query)
    .then(products => {
        res.render('home', {title: 'Browse',products})
    })
    .catch(() => res.status(500).end());
});

router.get('/create',isAuthenticated, (req,res) => {
    res.render('create', {title: 'Create'})
});

router.post('/create', isAuthenticated,validateProduct,(req,res) => {
    productService.create(req.body,req.user._id)
    .then(() => res.redirect('/'))
    .catch(() => res.status(500).end())
});

router.get('/details/:productId', async (req,res) => {
    let product = await productService.getOneWithAccessories(req.params.productId);

    res.render('details', {title:'Product Details',product})
});

router.get('/:productId/attach', isAuthenticated,async (req,res) => {

    let product = await productService.getOne(req.params.productId);

    let accessories = await accessoryService.getAllWithout(product.accesories);

    res.render('attachAccessory',{product,accessories});
})

router.post('/:productId/attach', isAuthenticated,(req,res) => {
    productService.attachAccessory(req.params.productId,req.body.accessory)
    .then(() => res.redirect(`/details/${req.params.productId}`))
});

router.get('/:productId/edit',isAuthenticated,(req,res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCube',product);
        });
})

router.post('/:productId/edit',isAuthenticated,(req,res) => {
    productService.updateOne(req.params.productId,req.body)
    .then(response => {
        res.redirect(`/details/${req.params.productId}`)
    })
})

router.get('/:productId/delete', isAuthenticated, (req,res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('deleteCube',product);
        });
});

router.post('/:productId/delete', isAuthenticated, (req,res) => {
    productService.deleteOne(req.params.productId)
        .then(response => {
            res.redirect('/');
        })
});

module.exports = router;