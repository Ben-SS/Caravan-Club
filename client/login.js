Template.login.helpers({
    userlogged:function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id:userId});
        if(user){
            return true;
        }
        else{
            return false;
        }
    }
});

Template.login.events({
    'click #login': function(event) {
        event.preventDefault();
        var passwordVar = $('#pwd').val();
        var usernameVar = $('#username').val();

        if(! Meteor.userId()){

            Meteor.loginWithPassword(usernameVar, passwordVar, function(){
                    if(Meteor.userId()){                        
                        return;
                    }
                    else if (! Meteor.userId()){
                        $('#login-fail-modal').modal('toggle');
                    }
            });
        }
    },

    'click #logout': function(event) {
        event.preventDefault();
        $('.dropdown-menu').toggle();                
        Meteor.logout(function(){
            window.location.reload();
            Router.go('/');                                
        })  
    }

});