Template.dashboard.helpers({
	email:function(){
		return Meteor.users.findOne().emails[0].address;
	},

	checked:function(){
		var user = Meteor.users.findOne({_id:Meteor.userId()});
		var newsletter = user.profile.newsletter;
		if(newsletter == true){
			return "checked";
		}
		else{
			return;
		}
	}
});

Template.dashboard.events({
	'click #username-change-btn':function(e){
		$('#change-username-modal').modal('toggle');
	},

	'click #password-change-btn':function(e){
		$('#change-password-modal').modal('toggle');
	},

	'click #email-change-btn':function(e){
		$('#change-email-modal').modal('toggle');
	},

	'submit #username-form': function(event) {
		var newUsername = event.target.newUsername.value;
		if(! newUsername == ""){
			Meteor.users.update( Meteor.userId(), { $set: { "username" : newUsername }} );
			event.target.reset();
            $("#change-username-modal").modal("hide");
            $("#dashboard").click();
		}
		else if(newUsername === ""){
	        $('#username-wrong').show();
		}
		event.preventDefault();
	},

	'submit #password-form': function(event) {
		var oldPassword = $("#oldPassword").val();
		var newPassword = $("#newPassword").val();
		Accounts.changePassword(oldPassword, newPassword, function(err){
			if(err){
				$('#password-wrong').show();
			}
			else{
				event.target.reset();
				$("#change-password-modal").modal("hide");
            	$("#dashboard").click();
			}
		});
		event.preventDefault();
	},

	'click #password-tryagain':function(event){
		event.preventDefault();
		$('#password-wrong').hide();
		document.getElementById('password-form').reset();
	},

	'submit #email-form': function(event) {
		var user = Meteor.users.findOne({_id:Meteor.userId()});
		var currentEmail = user.emails[0].address;
		var newEmail = event.target.newEmail.value;
		var confirmEmail = event.target.oldEmail.value;
		if(newEmail == confirmEmail){
			Meteor.users.update( Meteor.userId(), { $set: { "emails.0.address" : newEmail.toLowerCase() }} );
			event.target.reset();
            $("#change-email-modal").modal("hide");
		}
		else{
			$('#email-wrong').show();
			event.preventDefault();
		}
		event.preventDefault();
		$("#dashboard").click();
	},

	'click #email-tryagain':function(event){
		$('#email-wrong').hide();
		event.preventDefault();
		document.getElementById('email-form').reset();
	},

	'change #newsletter-check': function(event) {
		var checked = event.target.checked;
		var user = Meteor.userId();
		if(checked){
			Meteor.call("newsletterUp",user);
		}
		else{
			Meteor.call("newsletterDown",user);
		}
		
	},

	'submit #message-form': function(event) {
		var from = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
		var title = event.target.subject.value;
		var content = event.target.message.value;

		event.preventDefault();
		Meteor.call("newMessage", from, title, content);
		event.target.reset();
		$('#message-modal').modal('show');
	},

	'click #go-blog-btn':function(){
		Router.go('/blogAdmin');
	}
})