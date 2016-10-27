Template.videoModal.helpers({
    indicator:function(){
        return gallery.findOne({}).videos;
    },
    active:function(){
        var chosen = Session.get("video");
        var activeVideo = this.alt;

        if (activeVideo === chosen){
            return true;
        }
        if(activeVideo !== chosen){
            return false;
        }
    },
    galleryVideo:function(){
        return gallery.findOne().videos;
    }
});

Template.videoModal.events({
    'hidden.bs.modal #video-modal': function(e){
        Session.set("video","");
        $("." + "slider").removeClass('active');
        $("." + "item").removeClass('active');
    },
    'click .vid-image':function(e){
        $("#" + "vid-warning").fadeIn();
    },
    'click #vid-warning-btn':function(e){
        $("#" + "vid-warning").fadeOut();
    }
});