import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.publish('tempusers', function () {
    var user = this.userId;
    var admin = Meteor.users.findOne({_id:user});
    if(admin){
    	return tempusers.find();
    }
    else{
    	return;
    }
});

Meteor.publish('gallery', function () {
    return gallery.find();
});

Meteor.startup(() => {

    if (! Meteor.users.findOne()){
        var email = "admin@admin.com";
        var username = "Admin";
        var password = "admin123";
        console.log("creating a user with password 'admin123' and username: "+username);
        Accounts.createUser({
            username: username,
            email: email,
            password: password,
            Administrator: true
        });
    }

    if (! gallery.findOne()){
        
        gallery.insert({
            photos : [
                {   
                    src : "/caravan_1.jpg",
                    alt : "Example image 1",
                    title : "Example image 1",
                    description : "Spring break",
                },
                {   
                    src : "/caravan_2.jpg",
                    alt : "Example image 2",
                    title : "Example image 2",
                    description : "Preparing lunch",
                },
                {   
                    src : "/caravan_3.jpg",
                    alt : "Example image 3",
                    title : "Example image 3",
                    description : "Hiding in the mountain",
                },
                {   
                    src : "/caravan_4.jpg",
                    alt : "Example image 4",
                    title : "Example image 4",
                    description : "Camping in luxury",
                },
                {   
                    src : "/caravan_5.jpg",
                    alt : "Example image 5",
                    title : "Example image 5",
                    description : "Family time",
                }
            ]
        });
    console.log("loaded gallery");
    }

});
