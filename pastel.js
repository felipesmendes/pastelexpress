if (Meteor.isClient) {


  Template.hello.helpers({
    pedidos: function () {
      return Pedido.find({});
    },
    itens: function(){
      return Item.find({});
    },
    pessoas:function(){
        return Pessoa.find({});
    }
  });

  Template.hello.events({
    'change input': function (e,template) {
      var pessoa = event.target.parentNode.parentNode.querySelector("td:first-child").textContent;
      var inputs =  event.target.parentNode.parentNode.querySelector("input");
      console.log(inputs);
      console.log(this);
      console.log(pessoa);
      /*
      var tipo = this.nome;
      var valor = e.target.value;
      var pedido = [];
      pedido[tipo] = valor;
      var docid = Pedido.findOne({'nome':pessoa});
      console.log(docid);
      console.log(pessoa);
      console.log(pedido);
      Meteor.call('atualizaPedido',docid,pessoa,pedido);*/
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    'atualizaPedido':function(docid,nome,pedido){
      console.log(docid);
      console.log(nome);
      console.log(pedido);
      Pedido.upsert({nome:nome},{nome:nome,pedido:pedido});
    }
  })
}
