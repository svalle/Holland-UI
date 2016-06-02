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
         console.log("Outset: " + outset);
         console.log("Difference: " + diff);
    });    
});

var target = document.getElementById('myPano');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });


function createGrid(size) {
    var ratioW = Math.floor($(window).width()/size),
        ratioH = Math.floor($(window).height()/size);
    
    var parent = $('<div />', {
        class: 'grid', 
        width: ratioW  * size, 
        height: ratioH  * size
    }).addClass('grid').appendTo('body');

    for (var i = 0; i < ratioH; i++) {
        for(var p = 0; p < ratioW; p++){
            $('<div />', {
                width: size - 1, 
                height: size - 1
            }).appendTo(parent);
        }
    }
    
    $('<div />', {
        class: 'active_circle', 
        width: size, 
        height: size
    }).addClass('active_circle').appendTo('body')
}

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var grid_size = w/10;

createGrid(grid_size);

$( "body" ).keydown(function(event) {
  console.log( "Handler for .keypress() called." );
  console.log( event.which );
  
  //$('.active_circle').css('left',);
  if(event.which == 39){ //right
        var current_position = $('.active_circle').css('left');
        var current_position_value = Number(current_position.replace("px", ""));
        var offset = Number(grid_size);        
        console.log( current_position_value + offset);
        $('.active_circle').css('left', current_position_value + offset);
      
  }else if(event.which == 37){ //left
        var current_position = $('.active_circle').css('left');
        var current_position_value = Number(current_position.replace("px", ""));
        var offset = Number(grid_size);        
        console.log( current_position_value - offset);
        $('.active_circle').css('left', current_position_value - offset);
      
  }else if(event.which == 38){ //top
        var current_position = $('.active_circle').css('top');
        var current_position_value = Number(current_position.replace("px", ""));
        var offset = Number(grid_size);        
        console.log( current_position_value - offset);
        $('.active_circle').css('top', current_position_value - offset);
      
  }else if(event.which == 40){ //down
        var current_position = $('.active_circle').css('top');
        var current_position_value = Number(current_position.replace("px", ""));
        var offset = Number(grid_size);        
        console.log( current_position_value - offset);
        $('.active_circle').css('top', current_position_value + offset);
  }
});

$('body').click(function (e) { //Offset mouse Position
    var posX = $(this).offset().left,
        posY = $(this).offset().top;
        
    var horizontal_value = e.pageX - posX;
    var vertial_value = e.pageY - posY;
        
    var cell_value_horizontal =  Math.round(((e.pageX - posX) / grid_size));
    var cell_value_vertical =  Math.round(((e.pageY - posY) / grid_size));
        
    console.log((e.pageX - posX) + ' , ' + (e.pageY - posY));
    console.log(horizontal_value);
    console.log(vertial_value);
    console.log(cell_value_horizontal);
    console.log(cell_value_vertical);
    console.log(cell_value_horizontal*grid_size);
    console.log(cell_value_vertical*grid_size);
    $('.active_circle').css('left', cell_value_horizontal*grid_size);
    $('.active_circle').css('top', cell_value_vertical*grid_size);
});

