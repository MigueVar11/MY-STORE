const express = require('express');

const productRouter = require("./products.router")
const utilRouter = require("./utils.router")

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router)
  router.use('/products', productRouter)
  router.use('/utils',utilRouter)
}

module.exports =routerApi;
