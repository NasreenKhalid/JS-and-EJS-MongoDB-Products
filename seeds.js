const mongoose = require('mongoose')
const Product = require('./models/product')


mongoose.connect('mongodb://localhost/farmStand')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


//   const p = new Product ({
//     name: 'Ruby tomatoes',
//     price: 1.99,
//     category: 'fruit'
//   }) 

//   p.save().then(p=> {
//     console.log(p)
//   }).catch(e => {
//     console.log(e)
//   })
 
const seedProducts = [
    {
        name: 'Ruby tomatoes',
        price: 1.99,
        category: 'fruit'

    },
    {
        name: 'Fairy eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Chocolate whole milk',
        price: 4.39,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
.then(res => {console.log(res)})
.catch(e=> {console.log(e)})