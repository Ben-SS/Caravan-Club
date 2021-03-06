Template.home.onRendered(function() {

    GoogleMaps.load({ v: '3', key: 'AIzaSyD7BWdbEMycHAdif9up8viP8dnHo02cyx4', libraries: 'geometry,places' });

    GoogleMaps.ready('myMap', function(map) {
        // Add a marker to the map once it's ready
        var homeMarker = new google.maps.Marker({
            position: new google.maps.LatLng(28.6499974, -17.8666632),
            map: map.instance,
            animation: google.maps.Animation.DROP
        });
        var medano = new google.maps.Marker({
            position: new google.maps.LatLng(﻿28.041667, -16.533333),
            map: map.instance,
            animation: google.maps.Animation.DROP
        });
        var barlovento = new google.maps.Marker({
            position: new google.maps.LatLng(﻿28.816667, -17.766667),
            map: map.instance,
            animation: google.maps.Animation.DROP
        });
        var tajao = new google.maps.Marker({
            position: new google.maps.LatLng(﻿28.166603,-16.428073),
            map: map.instance,
            animation: google.maps.Animation.DROP
        });
        var puerto = new google.maps.Marker({
            position: new google.maps.LatLng(﻿28.4134, -16.5452),
            map: map.instance,
            animation: google.maps.Animation.DROP
        });
        homeMarker.addListener('click', function() {
            home.open(map.instance, homeMarker);
            
        });
        medano.addListener('click', function() {
            elmedano.open(map.instance, medano); 
        });
        barlovento.addListener('click', function() {
            barlo.open(map.instance, barlovento); 
        });
        tajao.addListener('click', function() {
            taj.open(map.instance, tajao); 
        });
        puerto.addListener('click', function() {
            puertoc.open(map.instance, puerto); 
        });
        
        var home = new google.maps.InfoWindow({
            content: "This is where we are based"
        });
        var elmedano = new google.maps.InfoWindow({
            content: "We often go camping here in El Médano"
        });
        var barlo = new google.maps.InfoWindow({
            content: "A local hot spot Barlovento"
        });
        var taj = new google.maps.InfoWindow({
            content: "A great location Tajao"
        });
        var puertoc = new google.maps.InfoWindow({
            content: "Tenerife north, Puerto!"
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

    MapOptions: function() {
    // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            
            var Center = new google.maps.LatLng(﻿28.1188289,-17.3637788);
            
            return {
                center: Center,
                zoom: 7,
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
    },

    videos: function(){
        var album = gallery.findOne({});
        return album.videos;
    }
});


Template.home.events({
    'click .images': function(event) {
        var alt = this.alt;
        Session.set("image",alt);
        $('#image-modal').modal('show');
    },
    'click .videos': function(event) {
        var alt = this.alt;
        Session.set("video",alt);
        $('#video-modal').modal('show');
    },
});

Template.imageModal.events({
    'hidden.bs.modal #image-modal': function(e){
        Session.set("image","");
        $("." + "slider").removeClass('active');
        $("." + "item").removeClass('active');
    }
});