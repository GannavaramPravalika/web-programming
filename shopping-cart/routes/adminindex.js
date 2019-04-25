
var express = require('express');
var router = express.Router();
var Product = require('../models/product');
/* GET home page. */
router.get('/adminindex', function(req, res, next) {
Product.find(function(err, docs) {
var productChunks = [];
var chunkSize = 3;
for(var i = 0; i<docs.length; i += chunkSize) {
productChunks.push(docs.slice(i, i + chunkSize));
}
res.render('shop/adminindex', { title: 'Shopping cart',products: productChunks});
});
});
router.get('/create', function(req, res, next) {
    res.render('shop/createnew');
});
module.exports= router;