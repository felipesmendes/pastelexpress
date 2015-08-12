Template.produtos.events({
  'keypress #nome':function(e,template){
     if (e.which === 13) {
        if(e.target.value != ''){
          Item.update({_id:this._id}, {$set:{nome: e.target.value}});
        }
     }
  },
  'keypress #preco':function(e,template){
     if (e.which === 13) {
        if(e.target.value != ''){
          Item.update({_id:this._id}, {$set:{preco: parseFloat(e.target.value)}});
        }
     }
  },
  'keypress #promocao':function(e,template){
     if (e.which === 13) {
        if(e.target.value != ''){
          Item.update({_id:this._id}, {$set:{promocao: parseFloat(e.target.value)}});
        }
     }
  },
  'click #cadastrarProduto':function(e,template){
    var nome = template.find("#nomeNovo").value;
    var preco = template.find("#precoNovo").value;
    var promocao = template.find("#promocaoNovo").value;
    if(nome != '' || (preco != '' && preco > 0)){
      Item.insert({nome:nome,preco:preco,promocao:promocao});
    }
  }
})
