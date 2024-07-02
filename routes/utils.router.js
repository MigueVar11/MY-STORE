const express = require('express');
const router = express.Router();
const Calculos = require('../Calculos');



router.get('/', (req, res) => {
  res.send('hola chicos servidor con express');
})


router.get('/imc/:altura/:peso', (req, res) => {
  altura = (req.params.altura.split(","));
   peso = req.params.peso;
  const calculos = new Calculos();
  console.log(altura)
  const imc = calculos.calcularImc(peso, altura[0]);
  res.json({imc});
})

module.exports = router
