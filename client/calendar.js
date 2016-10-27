Template.calendar.onRendered(function() {
	Meteor.subscribe("calendar");
});

Template.calendar.helpers({

	events:function(){
		return calendar.find({},{sort : {date: 1}});
	},

	format:function(date){
		return moment(date).format('dddd D MMMM YYYY');
	},

	checked:function(eventId){
		var userId = Meteor.userId();
        var name = Meteor.users.findOne({_id:userId}).profile.name;
		var match = calendar.find({'people':{$elemMatch:{$in:[name]}}}).fetch();
		var i;
		var brackets = [];
		for(i=0;i<match.length;i++){
			brackets.push(match[i]._id);
			while(brackets[i] == eventId){
				return "checked";
			}			
		}
	}

});

Template.calendar.events({
	'change input': function(event) {
		var checked = event.target.checked;
		var name = Meteor.users.findOne().profile.name;
		var event = this._id;
		if(checked){
			Meteor.call("attend",name,event);
		}
		else{
			Meteor.call("unattend",name,event);
		}
		
	}
});