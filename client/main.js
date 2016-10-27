Meteor.subscribe("users");
Meteor.subscribe("tempusers");
Meteor.subscribe("gallery");

// HELPERS

Template.home.onRendered(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyD7BWdbEMycHAdif9up8viP8dnHo02cyx4', libraries: 'geometry,places' });

    GoogleMaps.ready('myMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function() {
            infowindow.open(map.instance, marker);
        });

        var infowindow = new google.maps.InfoWindow({
            content: "hi"
        });
    });

    var lineoptions = {
        height: 475,
      // Don't draw the line chart points
      showPoint: true,
      // Disable line smoothing
      lineSmooth: true,
      // X-Axis specific configuration
      axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        // and also don't show the label
        showLabel: true
      },
      // Y-Axis specific configuration
      axisY: {
        showGrid: false,
        showLabel: true,
        onlyInteger: true
      }
    }

    var responsiveOptions = [
        ['screen and (max-width: 1365px)', {
            height:380
            }
        ],
        ['screen and (max-width: 620px)', {
            height:290,
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                return value[0];
            }
            }
        }],
        ['screen and (max-width: 458px)', {
            height:250
        }]
    ];

    new Chartist.Line('#lineChart', {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [14, 16, 17, 19, 22, 25, 28, 33, 36, 37, 38, 40],
        ]
    }, lineoptions, responsiveOptions)

    var bardata = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
        [1, 1, 2, 3, 3, 4, 6, 6, 7, 3, 2, 1]
        ]
        };

        var baroptions = {
        seriesBarDistance: 10,
        height: 475,
        // Don't draw the line chart points
        showPoint: true,
        // Disable line smoothing
        lineSmooth: true,
        // X-Axis specific configuration
        axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        // and also don't show the label
        showLabel: true
        },
        // Y-Axis specific configuration
        axisY: {
            showGrid: false,
            showLabel: true,
            onlyInteger: true
        }
        };

        var barresponsiveOptions = [
        ['screen and (max-width: 1365px)', {
            height:380
            }
        ],
        ['screen and (max-width: 620px)', {
            height:290,
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                return value[0];
            }
            }
        }],
        ['screen and (max-width: 458px)', {
            height:250
        }]
    ];
        new Chartist.Bar('#barChart', bardata, baroptions, barresponsiveOptions);
});

Template.home.helpers({
    navname:function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id:userId});
        if(user){
            return ("Hey "+user.username);
        }
        else{
            return "Login";
        }
    },

    MapOptions: function() {
    // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            
            var Center = new google.maps.LatLng(28.6499974, -17.8666632);
            
            return {
                center: Center,
                zoom: 6,
                zoomControl: false,
                scaleControl: false,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: [
                        google.maps.MapTypeId.ROADMAP,
                        google.maps.MapTypeId.SATELLITE
                    ]
                }
            }
            map.setTilt(45);
        }
    },

    images: function(){
        var album = gallery.findOne({});
        var photos = album.photos;
        var i;
        var countArr = [];
        for (i = 0; i < 3; i++) {
            var selection = photos[i];
            countArr.push(selection);
        }
        return countArr;
    }
});

Template.login.helpers({
    userlogged:function(){
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id:userId});
        if(user){
            return true;
        }
        else{
            return false;
        }
    }
});


// EVENTS

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        Session.set('showModal', false);
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var usernameVar = event.target.registerUsername.value;

        Meteor.call("register", emailVar, passwordVar, usernameVar, function(error, result){
            if(error){
                alert('Error');
            }else{
                Session.set("showModal", result)
            }
        });
        Session.get("showModal");
        event.target.reset();
        $('#reg-modal').modal('show');
    }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var passwordVar = event.target.loginPassword.value;
        var usernameVar = event.target.loginUsername.value;

        Meteor.loginWithPassword(usernameVar, passwordVar, function(){
                console.log("user logged in with email "+usernameVar);
        });
    },

    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout();
    }

});
