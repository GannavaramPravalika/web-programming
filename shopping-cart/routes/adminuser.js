var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport= require('passport');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/adprofile', isLoggedIn, function(req, res, next){
  res.render('Admin/adprofile');
});

router.get('/logout', isLoggedIn, function(req,res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});

router.get('/adsignup', function(req,res,next){
  var messages = req.flash('error');
  res.render('Admin/adsignup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
  }); 
  
  router.post('/adsignup', passport.authenticate('local.adsignup',{
  successRedirect: '/Admin/adprofile',
  failureRedirect: '/Admin/adsignup',
  failureFlash: true 
  }));
 
  router.get('/adsignin',function(req, res, next) {
  var messages= req.flash('error');
  res.render('Admin/adsignin',{csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length>0});
  });

  router.post('/adsignin', passport.authenticate('local.adsignin',{
  successRedirect: '/shop/adminindex',
  failureRedirect: '/Admin/adsignin',
  failureFlash: true 
  }));
  module.exports= router;

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/shop/adminindex');
}

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}


