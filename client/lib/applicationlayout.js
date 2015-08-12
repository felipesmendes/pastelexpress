Template.ApplicationLayout.events({
    'click #cadastrar': function(event,template) {
        var email = template.find('#email').value;
        var senha = template.find('#senha').value;
        var nome = template.find('#nome').value;
        if(email == '' || senha == '' || nome == ''){
          alert("Preencha todos os campos!");
        }else {
          Accounts.createUser({email:email,password:senha,profile:{name:nome}},function(err){
            if(!err){
              Router.go("/pedido");
            }
          });
        }

    },

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },
    'click #login':function(event,template){
      var email = template.find("#email").value;
      var senha = template.find("#senha").value;
      if(email == '' || senha == ''){
        alert("Preencha todos os campos!");
      }else{
        Meteor.loginWithPassword(email, senha, function(err){
          if(!err){
            Router.go("/pedidos");
          }else{
            console.log(err);
          }
        });
      }
    }
});
