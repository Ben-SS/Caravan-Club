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
        console.log("new user request sent "+nameVar +surnameVar);
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

    newMessage:function(from, title, content){
        if(Meteor.userId()){
            return messages.insert(
                {   
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
    }
});