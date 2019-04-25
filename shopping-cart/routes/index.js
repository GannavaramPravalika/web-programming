var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart  = require('../models/cart');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true});
/* GET home page. */
router.get('/', function(req, res, next) {
Product.find(function(err, docs) {
var productChunks = [];
var chunkSize = 3;
for(var i = 0; i<docs.length; i += chunkSize) {
productChunks.push(docs.slice(i, i + chunkSize));
}
res.render('shop/index', { title: 'Shopping cart',products: productChunks});
});
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId =  req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) { 
      if(err) {
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
 });

 router.get('/reduce/:id', function(req, res, next) {
  var productId =  req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
 });

 router.get('/remove/:id', function(req, res, next) {
  var productId =  req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
 });
 router.get('/shopping-cart', function(req, res, next) {
   if(!req.session.cart) {
     return res.render('shop/shopping-cart',{products: null});
   }
   var cart = new Cart(req.session.cart);
   res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
 });

 router.get('/checkout', function(req, res, next) {
   if(!req.session.cart) {
     return res.redirect('/shopping-cart');
   }
   var cart = new Cart(req.session.cart);
   req.session.cart=null; 
   res.render('shop/checkout', {total: cart.totalPrice,item:cart.items,   });
 });
 router.post('/insert',function(req,res,next){
  var products= new Product({
  imagePath: req.body.image,
  title: req.body.title,
  description: req.body.description,
  price: req.body.price
  });
  products.save();
  res.redirect('/shop/adminindex');
  });

router.get('/delete/:id',function(req,res,next){
  
  mongoose.model("Product").remove({_id:req.params.id},function(err,delData){
    res.redirect("/shop/adminindex");
    });
});

module.exports = router;

