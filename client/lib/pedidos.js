Template.pedidos.events({
  'click .excluir':function(e,template){
    Pedido.remove({_id:this._id});
  }
})
