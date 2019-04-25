var Product=require('../models/product');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser:true})
var products=[
new Product({
imagePath:'https://rukminim1.flixcart.com/image/704/704/jp8ngcw0/book/6/1/2/programming-in-ansi-c-original-imafbgf37y9gg48e.jpeg?q=70',
title:'C Programming',
description: 'All the concepts in these are very clear explained and is easy to understand',
price: 400
}),
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/51z2oLTIFRL._SX258_BO1,204,203,200_.jpg',
title:'JAVA',
description:'All the concepts in these are very clear explained and is easy to understand',
price:450
}),
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/71kBRLo8ZtL.jpg',
title:'Data Structures',
description:'All the concepts in these are very clear explained and is easy to understand', 
price:400
}),
new Product({
imagePath:'https://image.slidesharecdn.com/android-120517033315-phpapp02/95/android-1-728.jpg?cb=1337225771',
title:'Android',
description:'All the concepts in these are very clear explained and is easy to understand',
price:250
}),
new Product({
imagePath:'https://images-na.ssl-images-amazon.com/images/I/41QGbYii3OL._SX379_BO1,204,203,200_.jpg',
title:'Data Management System',
description:'All the concepts in these are very clear explained and is easy to understand',
price:300
}),
new Product({
imagePath:'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1502796039i/36044968._UY630_SR1200,630_.jpg',
title:'Python',
description:'All the concepts in these are very clear explained and is easy to understand',
price:500
}),
];
var done=0;
for(var i=0;i<products.length;i++)
{
products[i].save(function(err,result)
{
if(err)
console.error(err);
done++;
if(done==products.length)
{
exit();
}
});
}
function exit()
{
mongoose.disconnect();
}
