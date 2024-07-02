const express = require('express');
const router = express.Router();

const products = [];

router.use(express.json()); // Middleware para manejar el cuerpo de la solicitud POST

router.get('/', (req, res) => {
  res.json(products);
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id == id);
  if (!product) {
    res.status(404).send('Producto no encontrado'); //Cuando no se encuentras envia el error
    return;
  }
  res.json(product);
})

router.get('/:id/price', (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id == id);
  if (!product) {
    res.status(404).send('Producto no encontrado');
    return;
  }
  res.json({price: product.price});
})

router.get('/:id/:price', (req, res) => {
  const {id, price} = req.params;
  const product = products.find(product => product.id == id && product.price == price);
  if (!product) {
    res.status(404).send('Producto no encontrado');
    return;
  }
  res.json(product);
})

//Ruta POST CREADO PARAS AGREGAR ID.NOMBRE.PRECIO AL ARREGLO - INGRESADO POR METODO PUSH
router.post('/', (req, res) => {
  const { id, name, price } = req.body;
  if (!id || !name || !price) {
    res.status(400).json({ message: 'Por favor, proporcione id, name y price' });
    return;
  }
  products.push({ id, name, price });
  res.json({ message: "Producto creado Satisfactoriamente", data: { id, name, price } });
});

// RUTA POST para cambio de precio de un productos existente
router.post('/:id/price', (req, res) => {
  const productId = req.params.id;
  const newPrice = req.body.price;

  const productIndex = products.findIndex(product => product.id === productId);

  // Si el producto no se encuentra, devuelve un error 404
  if (productIndex === -1) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  products[productIndex].price = newPrice;

  res.json({ message: 'Precio del producto actualizado satisfactoriamente', data: products[productIndex] });
});

//ELIMINAR PRODCUTO EXISTENTE
router.post('/:id/delete', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(product => product.id == productId);

  if (productIndex === -1) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: 'Producto eliminado satisfactoriamente', data: deletedProduct });
});

// ACTUALIZAR EL NOMBRE DE UN PRODUCTO EXISTENTE
router.post('/:id/name', (req, res) => {
  const productId = req.params.id;
  const newName = req.body.name;

  const product = products.find(product => product.id == productId);

  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  product.name = newName;
  res.json({ message: 'Nombre del producto actualizado satisfactoriamente', data: product });
});


module.exports = router;
