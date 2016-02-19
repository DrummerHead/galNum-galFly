(function(document, href){


var $ = require('selector');
var galUi = require('gal-ui');


// Helper functions
//
var p = function(num){
  return parseInt(num, 10);
};




// Selector variables and source of data
//
var $hrefBar = $('#hb');
var $start = $('#start');
var $shift = $('#shift');
var $form = $('form');
var $main = $('main');
var hrefBarContent = '';
var constantHref;
var hrefParts = href.split(/(\d+)/).map(function(part){
  return {
    'prt' : part,
    'isN' : /^\d+$/.test(part),
    'isS' : false
  }
});


// Specifics of galNum related to creating the gallery and injecting
//
var splitBySelected = function(object){
  var result = ['', ''];
  var position = 0;
  for(chunk in object){
    object[chunk].isS ? position = 1 : result[position] += object[chunk].prt;
  }
  return result;
};

var zeroize = function(number, length){
  var num = number.toString();
  while(num.length < length){
    num = '0' + num;
  }
  return num;
};

var createGal = function(start, shift){
  $main.innerHTML = '';
  var galleryHTML = '<ul id="gal">';
  var hasZeros = /^0*/.test(start);
  var end = galUi.maxImage = p(start) + p(shift);
  galUi.currentImage = galUi.minImage = p(start);

  for(var i = p(start); i < end; i++){
    var num = (hasZeros ? zeroize(i, start.length) : i);
    var src = constantHref[0] + num + constantHref[1];
    galleryHTML += '<li><img id="a' + i + '" src="' + src + '" alt="' + num + '"><a href="' + src + '">' + src + '</a></li>';
  }
  galleryHTML += '</ul>';
  $main.innerHTML = galleryHTML;

  $main.insertAdjacentHTML('beforeEnd', '<div id="more">Load more</div>');
  $('#more').addEventListener('click', function(){
    scrollTo(0, 0);
    var newStart = (hasZeros ? zeroize(end, start.length) : end);
    $start.value = newStart;
    createGal(newStart, shift);
  });

  galUi.bindResize(document.querySelectorAll('img'));
};


for(part in hrefParts){
  var I = hrefParts[part];
  hrefBarContent += ( I.isN ? '<b data-position="' + part + '">' + I.prt + '</b>' : '<span>' + I.prt + '</span>' );
}
$hrefBar.innerHTML = hrefBarContent;
var $numbers = document.querySelectorAll('#hb b');

for(var i = 0; i < $numbers.length; i++){
  var I = $numbers.item(i);
  I.addEventListener('click', function(e){
    $form.classList.add('v');
    $hrefBar.classList.add('done');
    this.classList.add('s');
    hrefParts[this.getAttribute('data-position')].isS = true;
    constantHref = splitBySelected(hrefParts);
    $start.value = this.textContent;
    $shift.value = galUi.defaultShift;
  });
}


$form.addEventListener('submit', function(e){
  e.preventDefault();
  createGal($start.value, $shift.value);
  galUi.init($main);
});




})(document, href)
