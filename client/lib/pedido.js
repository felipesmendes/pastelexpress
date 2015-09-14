Template.pedido.events({
  'click .adicionar':function(e,template){
    var pessoa = template.find("#pessoa").value;
    var tipo = template.find("#tipo").value;
    var quantidade = template.find("#quantidade").value;
    if(quantidade == ''){
      alert("Preencha a quantidade!");
    }else if(quantidade <= 0 || quantidade > 100){
      alert("Quantidade deve ter um valor real");
    }else{
      if(pessoa == ""){
        pessoa = Meteor.userId();
      }
      Pedido.insert({pessoa:pessoa,tipo:tipo,quantidade:quantidade});
      template.find("#quantidade").value= "";
    }

  }
});
