Meteor.methods({
  getPedidosAgrupado: function() {
    var pedidos = Pedido.find({});
    var results = {};
    pedidos.forEach(function(pedido) {
      var tipo = Item.findOne({_id:pedido.tipo});
      if(!results[tipo.nome]) {
        results[tipo.nome] = 0;
      }
      results[tipo.nome]+= parseInt(pedido.quantidade);
    });
    return results;
  }
});
