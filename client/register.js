Template.register.events({
    'click #register-button':function(){
        $('#register-modal').modal('toggle');
    },

    'submit form': function(event) {
        event.preventDefault();
        Session.set('showModal', false);
        var nameVar = event.target.registerName.value;
        var surnameVar = event.target.registerSurname.value;
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var usernameVar = event.target.registerUsername.value;

        Meteor.call("register", nameVar, surnameVar, emailVar, passwordVar, usernameVar, function(error, result){
            if(error){
                alert('Error');
            }else{
                Session.set("showModal", result)
            }
        });
        Session.get("showModal");
        event.target.reset();
        $('#reg-modal').modal('show');
        //$('#register-modal').modal('hide');
    }
});