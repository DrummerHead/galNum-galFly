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

for(var i = 0; i < imgs.length; i++){
  if(imgs[i].href !== imgs[(i+1) % imgs.length].href){
    noRepeats.push(imgs[i])
  }
}

var lis = noRepeats.map(function(val, i){
  return '<li><img id="a' + i + '" src="' + val.href + '" alt="' + val.href + '"><a href="' + val.href + '">' + val.textContent + '</a></li>';
  });

var stringified = JSON.stringify(lis).replace(/\\/g, '\\\\').replace(/'/g, '\\\'');

var html = '<!doctype html><html><head><title>galFly</title><meta charset="utf-8"><style>body{margin:0;font-family:sans-serif;text-align:center}#gal{padding:1em;margin:0;list-style-type:none}#gal li{min-height:'+innerHeight+'px;padding:4em 0}#gal img{display:block;max-width:100%;margin:0 auto;font-size:3em;color:#ccc}#gal a{display:inline-block;padding:1em;text-decoration:none;color:#ccc}#gal a:hover{color:gray;text-decoration:underline}#move{position:fixed;bottom:0;left:0;width:5em;padding:0;margin:0;font-size:1.4em;list-style-type:none;color:#888;-webkit-user-select:none;-moz-user-select:none;user-select:none}#move li{float:left;width:2.75em;height:2em;line-height:2em;cursor:pointer}#move li:hover{color:#444}#down,#up{text-indent:.5em}#down{clear:left}#move #zoom{width:2em;text-indent:-.5em}#more{padding:1em;font-size:1.5em;font-weight:700;background-color:#eee;color:#888;cursor:pointer}#more:hover{background-color:#ddd;color:#777}#end{background-color:#ffb1ba;height:10em}</style></head><body><ul id="gal"></ul><ol id="move"><li id="up">&#9650;</li><li id="down">&#9660;</li><li id="zoom">&#128269;</li></ol><script>var stringified=\''+stringified+'\'</script><script>!function(a,b){var c=function(b){return a.querySelector(b)},d=function(){return{defaultShift:25,currentImage:0,minImage:0,maxImage:this.defaultShift,init:function(a){var b=this;b.galWidth=parseInt(getComputedStyle(a).getPropertyValue("width"),10),onkeypress=function(a){106==a.charCode?b.goToImage(!0):107==a.charCode?b.goToImage(!1):108==a.charCode&&b.zoom(c("#a"+b.currentImage))},c("#down").addEventListener("click",function(){b.goToImage(!0)}),c("#up").addEventListener("click",function(){b.goToImage(!1)}),c("#zoom").addEventListener("click",function(){b.zoom(c("#a"+b.currentImage))})},goToImage:function(b){b?this.currentImage+1>=this.maxImage?scrollTo(0,a.body.scrollHeight):scrollTo(0,c("#a"+ ++this.currentImage).offsetTop-5):this.currentImage-1>=this.minImage&&scrollTo(0,c("#a"+--this.currentImage).offsetTop-5)},zoom:function(a){var b=a.currentTarget||a,c=b.naturalWidth*(b.ct+1);c<=this.galWidth?(b.ct++,b.setAttribute("style","width:"+c+"px;height:"+b.naturalHeight*b.ct+"px")):(b.ct=0,b.setAttribute("style","width:100%"))},bindResize:function(a){for(var b=0;b<a.length;b++){var c=a.item(b);c.ct=1,c.addEventListener("click",this.zoom.bind(this))}}}}(),e=c("#gal"),f=JSON.parse(b),g=d.defaultShift,h=function(b){var i=e.innerHTML="";if(d.currentImage=d.minImage=b,f.length>g){for(var j=b;j<b+d.defaultShift;j++)i+=f[j];g+=d.defaultShift,d.maxImage=b+d.defaultShift,e.insertAdjacentHTML("afterEnd",\'<div id="more">Load more</div>\'),c("#more").addEventListener("click",function(){scrollTo(0,0),this.outerHTML="",h(b+d.defaultShift)})}else{for(var j=b;j<f.length;j++)i+=f[j];d.maxImage=f.length,e.insertAdjacentHTML("afterEnd",\'<div id="end"></div>\')}e.innerHTML=i,d.bindResize(a.querySelectorAll("img"))};d.init(e),h(0)}(document,stringified);</script></body></html>';

// window.open('data:text/html,' + encodeURIComponent(html));
document.write(html);
document.close();




/* -  /galFly  - */
