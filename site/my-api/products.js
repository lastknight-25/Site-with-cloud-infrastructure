const express = require('express')
const router = express.Router()



// validate products
const fs = require("fs");
const Ajv = require("ajv");

const schema = JSON.parse(fs.readFileSync("./schemas/products.schema.json"));
const products = JSON.parse(fs.readFileSync("./data/products.json"));

const ajv = new Ajv();
const validate = ajv.compile(schema);

products.forEach(p => {
  if (!validate(p)) {
    console.error(`Invalid product ${p.id}:`, validate.errors);
  }
});

router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync("./data/products.json"));
    const cleanProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image
  }));

  res.json(cleanProducts);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const products = JSON.parse(fs.readFileSync("./data/products.json"));

  const requestedProduct = products.find(p => p.id === id);

  if (!requestedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  const cleanProduct = {
    id: requestedProduct.id,
    name: requestedProduct.name,
    price: requestedProduct.price,
    image: requestedProduct.image
  };

  res.json(cleanProduct);
});

// router.post('/', (req, res) =>{
//     const {name, price} = req.body
//     const newProduct = {
//         name,
//         price
//     }
//     console.log(newProduct)
//     res.json({message : 'New product added', product: newProduct})
// })

module.exports = router