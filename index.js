(async () => {
  const database = require('./db');
  const Produto = require('./models/produto');
  try {
    const resultado = await database.sync();
    console.log(resultado);

    // CRUD: Create
    const resultadoCreate = await Produto.create({
      nome: 'mouse',
      preco: 10,
      descricao: 'Um mouse USB bonitão',
    });
    console.log(resultadoCreate);

    // CRUD: Read
    const produtos = await Produto.findAll();
    console.log(produtos);

    const produto1 = await Produto.findByPk(1);
    console.log(produto1);

    // CRUD: Update
    const produto2 = await Produto.findByPk(1);
    console.log(produto2);
    produto2.nome = 'Mouse Top';

    const resultadoSave = await produto.save();
    console.log(resultadoSave);

    // CRUD: Delete
    // assim
    Produto.destroy({ where: { id: 1 } });

    // ou assim
    produto3 = await Produto.findByPk(1);
    produto3.destroy();
  } catch (error) {
    console.log(error);
  }
})();
