
Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', {
	name: "home",
	action: function () {
    	this.render('home');
  	}
});

Router.route('/blog', {
	name: "blog",
	action: function () {
		this.render('blog');
  	}
});

Router.route('/blogAdmin', {
	name: "blogAdmin"
});

Router.route('/:id', {
	name: "dashboard",

    data: function() {
    	var id = Meteor.userId();
      	return Meteor.users.findOne({_id:id});
    },

    action: function(){
    	this.render('dashboard');
    }
});