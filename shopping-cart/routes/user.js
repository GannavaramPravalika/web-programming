
var express = require('express');
var router = express.Router();
var Cart=require('../models/cart');

var Product = require('../models/product');

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
router.get('/add-to-cart/:id',function(req,res,next){
var productId = req.params.id;
var cart=new cart(req.session.cart ? req.session.cart : {});
Product.findById(productId, function(err,product){
if(err)
{
return res.redirect('/');
}
cart.add(product, product.id);
req.session.cart = cart;
console.log(req.session,cart);
res.redirect('/');
});
});

module.exports= router;
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport= require('passport');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
res.render('user/profile');
});

router.get('/logout', isLoggedIn, function(req,res, next){
req.logout();
res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
next();
});

router.get('/signup', function(req,res,next){
var messages = req.flash('error');
res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
}); 
router.post('/signup', passport.authenticate('local.signup',{
successRedirect: '/user/profile',
failureRedirect: '/user/signup',
failureFlash: true 
}));
router.get('/signin',function(req, res, next) {
var messages= req.flash('error');
res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length>0});
});

router.post('/signin', passport.authenticate('local.signin',{
successRedirect: '/user/profile',
failureRedirect: '/user/signin',
failureFlash: true 
}));

module.exports= router;

function isLoggedIn(req, res, next) {
if(req.isAuthenticated()) {
return next();
}
res.redirect('/');
}

function notLoggedIn(req, res, next) {
if(!req.isAuthenticated()) {
return next();
}
res.redirect('/');
}




