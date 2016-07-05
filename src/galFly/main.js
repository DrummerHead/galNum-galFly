(function(document, stringified){

var $ = require('selector');
var galUi = require('gal-ui');


// Selector variables and source of data
//
var $gal = $('#gal');
var imageLinks = JSON.parse(stringified);
var increase = galUi.defaultShift;


// Specifics of galFly related to creating the gallery and injecting
//
var createGal = function(start){
  var galleryHTML = $gal.innerHTML = '';
  galUi.currentImage = galUi.minImage = start;

  if(imageLinks.length > increase){
    for(var i = start; i < start + galUi.defaultShift; i++){
      galleryHTML += imageLinks[i];
    }
    increase += galUi.defaultShift;
    galUi.maxImage = start + galUi.defaultShift;

    $gal.insertAdjacentHTML('afterEnd', '<div id=\"more\">Load more</div>');
    $('#more').addEventListener('click', function(){
      scrollTo(0, 0);
      this.outerHTML = '';
      createGal(start + galUi.defaultShift);
    });
  }
  else {
    for(var i = start; i < imageLinks.length; i++){
      galleryHTML += imageLinks[i];
    }
    galUi.maxImage = imageLinks.length;
    $gal.insertAdjacentHTML('afterEnd', '<div id=\"end\"></div>');
  }

  $gal.innerHTML = galleryHTML;
};


galUi.init($gal);

createGal(0);




})(document, stringified)
