$(document).ready(function(){
    $("#myPano").pano({
        img: "img/sphere1.jpg"
    });
});

$("#zoom_01").elevateZoom({ zoomType	: "lens", lensShape : "round", lensSize : 400 }); 

function ViewPort()
{
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var viewsize = w + "," + h;
    console.log("Your View Port Size is:" + viewsize);
}

var img = new Image();
img.onload = function() {
  //console.log("Image size");
  //console.log(this.width + 'x' + this.height);
}
img.src = 'img/sphere1.jpg';

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        console.log('style changed!');
        console.log(mutationRecord);
        var position = $('#myPano').css( "background-position" );
        var temp = position.replace("px", "");
        var pos_value = temp.split(" ")[0];
        console.log("Position: "+  temp.split(" ")[0]);
        ViewPort();
        console.log(img.width + 'x' + img.height);
        var outset = img.width - pos_value;
        var diff = img.width - w;
        var diff_position = img.width - temp.split(" ")[0];
         console.log("Outset: " + outset);
         console.log("Difference with the viewport: " + diff);
         console.log("Difference with the image: " + diff_position);
    });    
});

var target = document.getElementById('myPano');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });

