/* -  This is a javascript snippet to be used with
      http://mcdlr.com/js-inject/             - */


/* -  galFly                                                   - *\
|* -  Render linked images from current page                   - *|
|*-   To know more check http://mcdlr.com/galNum-galFly/       - *|
\* -  v3.0                                                     - */




var imgs = Array.prototype.filter.call(document.links, function(val){
  return /\.(jpe?g|gif|png|tiff|svg)(\?.*)?$/i.test(val.href);
});

var noRepeats = [];
var imgsLastIndex = imgs.length - 1;
for(var i = 0; i < imgsLastIndex; i++){
  if(imgs[i].href !== imgs[i+1].href){
    noRepeats.push(imgs[i]);
  }
};
noRepeats.push(imgs[imgsLastIndex]);

var lis = noRepeats.map(function(val, i){
  return '<li><img id="a' + i + '" src="' + val.href + '" alt="' + val.href + '"><a href="' + val.href + '">' + val.textContent + '</a></li>';
});

var stringified = JSON.stringify(lis).replace(/\\/g, '\\\\').replace(/'/g, '\\\'');

var html = '{{html}}';

// window.open('data:text/html,' + encodeURIComponent(html));
document.write(html);
document.close();




/* -  /galFly  - */
