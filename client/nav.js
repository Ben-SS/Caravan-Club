Template.nav.helpers({

    loggedIn:function(){
            var logged = Meteor.userId();
            if(logged){
                return true;
            }
            else{
                return;
            }
        },
        
        navname:function(){
            var userId = Meteor.userId();
            var user = Meteor.users.findOne({_id:userId});
            if(user){
                return ("Hi "+user.profile.name);
            }
            else{
                return "Login";
            }
        },

        id:function(){
            return Meteor.userId();
        },

        home:function(){
            var route = Router.current().route.getName();
            if(route == "home"){
                
                return "active";
            }
            else{
                return;
            }
        },

        dashboard:function(){
            var route = Router.current().route.getName();
            if(route == "dashboard"){
                
                return "active";
            }
            else{
                return;
            }
        },

        blog:function(){
            var route = Router.current().route.getName();
            if(route == "blog"){
                
                return "active";
            }
            else{
                return;
            }
        },

        blogAdmin:function(){
            var route = Router.current().route.getName();
            if(route == "blogAdmin"){
                
                return "active";
            }
            else{
                return;
            }
        }
});