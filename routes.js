Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function () {
  this.render('pedido',{
    data: function () {
      var pedidos = Pedido.find({pessoa:Meteor.userId()}).fetch();
      var pedidosJoin = [];
      for(i in pedidos){
        var pessoa = Meteor.users.findOne({_id:pedidos[i].pessoa});
        var tipo = Item.findOne({_id:pedidos[i].tipo}).nome;
        pedidosJoin.push({pessoa:pessoa.profile.name,tipo:tipo,quantidade:pedidos[i].quantidade});
      }
      templateData = { itens: Item.find({}),pedidos:pedidosJoin };
      return templateData;
      }
  });
});
Router.route('/produtos', function () {
  this.render('produtos',{
    data: function () {
      templateData = { produtos: Item.find({})};
      return templateData;
      }
  });
});
Router.route('/cadastrar', function () {
  this.render('cadastrar');
});
Router.route('/login', function () {
  this.render('login');
});
Router.route('/pedidos', function () {
  this.render('pedidos',{
    data: function () {
      var pedidos = Pedido.find({}).fetch();
      var results = {};
      var pedidosJoin = [];
      var pedidosPessoa = {};
      var soma = 0;
      pedidos.forEach(function(pedido) {
        var tipo = Item.findOne({_id:pedido.tipo});
        var pessoa = Meteor.users.findOne({_id:pedido.pessoa});
        var nome = pessoa.profile.name;
        soma += pedido.quantidade*tipo.preco;
        if(!results[tipo.nome]) {
          results[tipo.nome] = 0;
        }
        if(!pedidosPessoa[nome]) {
          pedidosPessoa[nome] = 0;
        }
        pedidosPessoa[nome] += parseInt(pedido.quantidade)*parseFloat(tipo.preco);
        results[tipo.nome]+= parseInt(pedido.quantidade);
        pedidosJoin.push({_id:pedido._id,pessoa:pessoa.profile.name,tipo:tipo.nome,quantidade:pedido.quantidade});
      });
      var somaDesconto = 0;
      for(result in results){
        var tip = Item.findOne({nome:result});
        var total = results[tip.nome];
        var promo10 = Math.floor(total/10)*10;
        total -= promo10;
        var promo4 = Math.floor(total/4)*4;
        total -= promo4;
        var desconto = promo10*(tip.preco-tip.promocao)+promo4*(tip.preco-tip.promocao);
        somaDesconto+=desconto;
        console.log(desconto);
      };
      soma = soma - somaDesconto;
      var ssdd = soma/_.size(pedidosPessoa);
      templateData = { pedidos: pedidosJoin,soma:soma.toFixed(2),results:results,pedidosPessoa:pedidosPessoa,ssdd:ssdd};
      return templateData;
      }
  });
});
