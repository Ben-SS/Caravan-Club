Template.dashboard.helpers({
	email:function(){
		return Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
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
	},

	user:function(){
		var id = Meteor.userId();
		var admin = Meteor.users.findOne({_id:id}).profile.administrator;
		if(admin == true){
			return false;
		}
		else if (admin == false){
			return true;
		}
	},

	admin:function(){
		var id = Meteor.userId();
		var admin = Meteor.users.findOne({_id:id}).profile.administrator;
		if(admin == true){
			return true;
		}
		else if (admin == false){
			return false;
		}
	},

	events:function(){
		return calendar.find({}).fetch()
	},

	tempuser:function(id){
		return tempusers.find({});
	},

	existingUsers:function(){
		return Meteor.users.find({"profile.administrator":false},{sort:{'profile.name':1}});
	},

	message:function(){
		var user = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
		return messages.find({to:user},{sort:{date:-1}});
	},

	format:function(date){
		return moment(date).format('LL');
	},

	unread:function(){
		var eventId = this._id;
		var event = messages.findOne({_id:eventId});
		var unread = event.unread;
		if(unread == true){
			return "unread";
		}
		else if(unread == false){
			return;
		}
	},

	noMessages:function(){
		var user = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
		var newMessages = messages.findOne({"to":user});
		if(newMessages){
			return "hidden";
		}
		else{
			return;
		}
	},

	noTempUsers:function(){
		var tempUsers = tempusers.findOne();
		if(tempUsers){
			return "hidden";
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

	'submit #user-message-form': function(event) {
		var from = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
		var title = event.target.subject.value;
		var content = event.target.message.value;

		event.preventDefault();
		Meteor.call("newUserMessage", from, title, content);
		event.target.reset();
		$('#message-modal').modal('show');
	},

	'submit #admin-message-form': function(event) {
		var to = $("#users-list").val();
		var from = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
		var title = event.target.subject.value;
		var content = event.target.message.value;

		event.preventDefault();
		Meteor.call("newAdminMessage", to, from, title, content);
		event.target.reset();
		$('#admin-message-modal').modal('show');
	},

	'click #go-blog-btn':function(){
		Router.go('/blogAdmin');
	},

	'click #add-event':function(){
		$('#add-event-modal').modal('show');
	},

	'click #remove-event':function(){
		$('#remove-event-modal').modal('show');
	},

	'submit #add-event-form':function(){
		var title = event.target.eventTitle.value;
		var description = event.target.eventDescription.value;
		var theDate = event.target.eventDate.value;
		var admin = Meteor.users.findOne({"profile.administrator":true});

		event.preventDefault();
		Meteor.call("addEvent", admin, title,description,theDate);
			
	},

	'click .remove-event-btn':function(){
		var event = this._id;
		var admin = Meteor.users.findOne({"profile.administrator":true});

		Meteor.call("removeEvent", admin, event);
	},

	'click .user-no-btn':function(){
		var event = this._id;
		var admin = Meteor.users.findOne({"profile.administrator":true});

		Meteor.call("removeTempUser", admin, event);

	},

	'click .user-yes-btn':function(){
		var tempUser = tempusers.findOne({_id:this._id});
		var username = tempUser.username;
		var email = tempUser.email;
		var password = tempUser.password;
		var name = tempUser.profile.name;
		var surname = tempUser.profile.surname;

		var admin = Meteor.users.findOne({"profile.administrator":true});

		Meteor.call("addTempuser", admin, username, email, password, name, surname);
	},

	'click .delete-user-btn':function(){
		var user = this._id;
		var admin = Meteor.users.findOne({"profile.administrator":true});

		Meteor.call("removeUser", admin, user);
	},

	'click .show-content-btn':function(){
		var id = this._id;
		$("."+"message-content-div-"+id).slideToggle();
		Meteor.call("read",id);
	},

	'click .delete-message-btn':function(){
		var id = this._id;
		Meteor.call("removeMessage",id);
	}
})