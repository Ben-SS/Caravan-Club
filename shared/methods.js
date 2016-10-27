// METHODS

Meteor.methods({
	register:function(emailVar, passwordVar, usernameVar){

		tempusers.insert({
        	email: emailVar,
            password: passwordVar,
            username: usernameVar,
            Administrator: false
        });
        console.log("new user request sent "+usernameVar);
        return true;
	}
});