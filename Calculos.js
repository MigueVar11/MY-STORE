class Calculos {
  constructor() {
    // Constructor code here
  }

   calcularImc(peso, altura) {
    return peso / (altura * altura);

  }
}

module.exports = Calculos;
