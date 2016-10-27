Template.imageModal.helpers({
    indicator:function(){
        return gallery.findOne({}).photos;
    },
    active:function(){
        var chosen = Session.get("image");
        var activeImage = this.alt;

        if (activeImage === chosen){
            return true;
        }
        if(activeImage !== chosen){
            return false;
        }
    },
    galleryImage:function(){
        return gallery.findOne().photos;
    }
});