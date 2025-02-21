const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const methodOverride = require('method-override')

const Product = require('./models/product');



mongoose.connect('mongodb://localhost/farmStand')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.set('views' , path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable' , 'dairy', 'fungi']

app.get('/products' , async(req,res) => {
  const {category } = req.query;
  if (category ) {
    const products =  await Product.find({category})
    res.render('products/index', {products, category})
  } else {
    const products =  await Product.find({})
    res.render('products/index', {products , category : 'All'})
  }
   

 
})

app.get('/products/new', (req,res) => {
  res.render('products/new', {categories})
})

app.post('/products', async(req,res) => {
 const newProduct =  new Product(req.body);
 await newProduct.save();
 console.log(newProduct)
 res.redirect(`/products/${newProduct._id}`)

})

app.get('/products/:id', async (req,res) => {
const {id} = req.params;
const product = await Product.findById(id);
console.log(product) 
res.render('products/show', { product})
})


app.get('/products/:id/edit', async (req,res) => {
  const {id} = req.params;
  const product = await Product.findById(id)
  res.render('products/edit', {product, categories})
})

app.put('/products/:id', async(req,res) => {
  console.log(req.body)
const {id} = req.params;
const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true})
res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async(req,res) => {

const {id} = req.params;
const deletedProduct = await Product.findByIdAndDelete(id)
res.redirect(`/products`)
})



app.listen(3000, () => {
    console.log('App is listening on port 3000')
})