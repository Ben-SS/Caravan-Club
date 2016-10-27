import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
    var admin = Meteor.users.findOne({username:"admin"});
    var adminId = admin._id;
    var currentUserId = this.userId;

    if (adminId == currentUserId){
        return Meteor.users.find();
    }
    else if (this.userId){
        return Meteor.users.find({_id:this.userId});
            //,
            //{fields: {'username': 1, '_id': 1, 'profile': 1}};
    }
});

Meteor.users.allow({
  update: function(userId, user) {
    return true; 

    /**
     * Don't use `return true` in production!
     * You probably need something like this:
     * return Meteor.users.findOne(userId).profile.isAdmin;
     */
  }
});

Meteor.publish('tempusers', function () {
    var admin = Meteor.users.findOne({username:"admin"});
    var adminId = admin._id;
    var currentUserId = this.userId;

    if (adminId == currentUserId){
        return tempusers.find();
    }
    else{
        return false;
    }
});

Meteor.publish('gallery', function () {
        return gallery.find();
});

Meteor.publish('calendar', function () {
        if(this.userId){
            return calendar.find();
        }
        else{
            return false;
        }
});

Meteor.publish('messages', function () {
        if(this.userId){
            return messages.find();
        }
        else{
            return false;
        }
});

Meteor.startup(() => {

    if (! Meteor.users.findOne()){
        var email = "admin@admin.com";
        var username = "admin";
        var password = "admin";

        var emailUser1 = "juan@test.com";
        var usernameUser1 = "juan";
        var passwordUser1 = "juan";

        var emailUser2 = "manuel@test.com";
        var usernameUser2 = "manu";
        var passwordUser2 = "manu";
        
        Accounts.createUser({
            username: username,
            email: email,
            password: password,
            profile: {
                name: 'Admin',
                surname: 'Coordinator',
                administrator: true
            }
        })

        console.log("created a user with password 'admin' and username: "+username);
        Meteor.users.update({username: username}, {$set: {roles: ['blogAdmin']}});

        Accounts.createUser({
            username: usernameUser1,
            email: emailUser1,
            password: passwordUser1,
            profile: {
                name: 'Juan',
                surname: 'Suarez Blas',
                administrator: false,
                newsletter: false
            }
        })
        console.log("created a user with password 'juan' and username: "+usernameUser1);
        Meteor.users.update({username: usernameUser1}, {$set: {roles: ['blogAuthor']}});
        
        Accounts.createUser({
            username: usernameUser2,
            email: emailUser2,
            password: passwordUser2,
            profile: {
                name: 'Manuel',
                surname: 'Toledo Vidal',
                administrator: false,
                newsletter: false
            }
        })
        console.log("created a user with password 'manu' and username: "+usernameUser2);
        Meteor.users.update({username: usernameUser2}, {$set: {roles: ['blogAuthor']}});
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
            ],
            videos : [
                {   
                    src : "/video_1.jpg",
                    alt : "Example video 1",
                    title : "Example video 1",
                    description : "Play time",
                },
                {   
                    src : "/video_2.jpg",
                    alt : "Example video 2",
                    title : "Example video 2",
                    description : "Lunch time",
                }
            ]
        });
    console.log("loaded gallery");
    }

    if (! calendar.findOne()){

        var entries = [
                        {
                            title  : 'Family BBQ',
                            description  : 'Family bbq in el refugio, starting at 14:30',
                            date  : new Date("2016-10-29"),
                            people    : ["Juan","Manuel"]
                        },
                        {
                            title  : 'Beach day',
                            description  : 'Trip down to La Zamora for a fun filled day by the sea',
                            date  : new Date("2016-10-25"),
                            people    : ["Juan"]
                        },
                        {
                            title  : 'Trip to Tenerife',
                            description  : 'Stay overnight at El Médano',
                            date  : new Date("2016-10-28"),
                            people    : ["Juan"]
                        }
                    ]

        _.each(entries, function(doc) { 
          calendar.insert(doc);
        })
        
        console.log("loaded events in calendar");
    }

    if (! messages.findOne()){
        
        messages.insert(
            {   
                from : "",
                title: "Welcome",
                content : "Welcome administrator",
                date : new Date(),
                unread : true
            }
        )
    console.log("loaded welcome message");
    }

});
