//index.js
(async () => {
  const database = require('./db');
  const Produto = require('./models/produto');
  const Fabricante = require('./models/fabricante');
  const Categoria = require('./models/categoria');
  const CategoriaProduto = require('./models/categoriaProduto');

  try {
    Produto.belongsTo(Fabricante, {
      constraint: true,
      foreignKey: 'idFabricante',
    });
    Fabricante.hasMany(Produto, {
      foreignKey: 'idFabricante',
    });
    Produto.belongsToMany(Categoria, {
      foreignKey: 'idProduto',
      constraints: true,
      through: {
        model: CategoriaProduto,
      },
    });
    Categoria.belongsToMany(Produto, {
      foreignKey: 'idCategoria',
      constraints: true,
      through: {
        model: CategoriaProduto,
      },
    });

    const resultado = await database.sync({ force: true });
    //console.log(resultado);

    const resultadoCreate = await Fabricante.create({
      nome: 'Apple',
    });
    const idFabricante = resultadoCreate.id;

    const resultadoCreate2 = await Produto.create({
      nome: 'iPhone',
      preco: 5000,
      descricao: 'Smartphone da maçã',
      idFabricante: idFabricante,
    });
    //console.log(resultadoCreate2);

    // Eager Loading

    const produto1 = await Produto.findByPk(resultadoCreate2.id, {
      include: Fabricante,
    });
    //console.log(produto);
    const fabricante1 = await produto1.getFabricante();
    console.log(fabricante1);

    // Lazy Loading

    const produto2 = await Produto.findByPk(resultadoCreate2.id);
    //console.log(produto);
    const fabricante2 = await produto2.getFabricante();
    console.log(fabricante2);

    // Produtos de um Fabricante

    const fabricante3 = await Fabricante.findByPk(resultadoCreate.id, {
      include: Produto,
    });
    //console.log(fabricante);
    const produtos = await fabricante3.getProdutos();
    console.log(produtos);

    const produto3 = await Produto.findByPk(resultadoCreate2.id);
    const categoria = await Categoria.findByPk(resultadoCreate2.id);
    //console.log(produto);
    await produto3.setCategorias([categoria]);

    // ou
    // await categoria.setProdutos([produto]);
  } catch (error) {
    console.log(error);
  }
})();
