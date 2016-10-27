// METHODS

Meteor.methods({
	register:function(nameVar, surnameVar, emailVar, passwordVar, usernameVar){

		tempusers.insert({
            username: usernameVar,
            email: emailVar,
            password: passwordVar,
            profile: {
                name: nameVar,
                surname: surnameVar,
                Administrator: false
            },
            roles: [
                "blogAuthor"
            ]   
        });
        return true;
	},

    attend:function(name,event){
        if (Meteor.userId()){
            return calendar.update({_id:event}, { $addToSet: { "people": name }});
        }
        else{
            return false;
        }
    },

    unattend:function(name,event){
        if (Meteor.userId()){
            return calendar.update({_id:event}, { $pull: { "people": name }});
        }
        else{
            return false;
        }
    },

    newsletterUp:function(user){
        if (user){
            return Meteor.users.update({_id:user}, {$set : {"profile.newsletter": true}});
        }
        else{
            return false;
        }
    },

    newsletterDown:function(user){
        if (user){
            return Meteor.users.update({_id:user}, {$set : {"profile.newsletter": false}});
        }
        else{
            return false;
        }
    },

    newUserMessage:function(from, title, content){
        if(Meteor.userId()){
            return messages.insert(
                {   
                    to: "Admin",
                    from : from,
                    title: title,
                    content : content,
                    date : new Date(),
                    unread : true
                }
            )
        }
        else{
            return false;
        }
    },

    newAdminMessage:function(to, from, title, content){
        if(Meteor.userId()){
            return messages.insert(
                {   
                    to: to,
                    from : from,
                    title: title,
                    content : content,
                    date : new Date(),
                    unread : true
                }
            )
        }
        else{
            return false;
        }
    },

    addEvent:function(admin,title,description,theDate){
        if(admin){
            calendar.insert({title:title, description:description, date:new Date(theDate), people:[]})
        }
        else{
            return;
        }
    },

    removeEvent:function(admin,event){
        if(admin){
            calendar.remove({_id:event});
        }
        else{
            return;
        }
    },

    removeTempUser:function(admin,event){
        if(admin){
            tempusers.remove({_id:event});
        }
        else{
            return;
        }
    },

    addTempuser:function(admin, username, email, password, name, surname){
        if(admin){

            Accounts.createUser({
                username: username,
                email: email,
                password: password,
                profile: {
                    name: name,
                    surname: surname,
                    administrator: false,
                    newsletter: false
                }
            });
            
            Meteor.users.update({username: username}, {$set: {roles: ['blogAuthor']}})
            tempusers.remove({username:username});
        }
        else{
            return;
        }
    },

    removeUser:function(admin,user){
        if(admin){
            Meteor.users.remove({_id:user});
        }
        else{
            return;
        }
    },

    read:function(id){
        return messages.update({_id:id}, {$set : {unread: false}});
    },

    removeMessage:function(id){
        return messages.remove({_id:id});
    }
});