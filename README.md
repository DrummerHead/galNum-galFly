# galNum & galFly

For a description of these bookmarklets, check: http://mcdlr.com/galNum-galFly/ or `index.html`

## Requirements

To use the bookmarklets you only need a browser.

To modify them and make use of these build tool you'll need [Grunt](http://gruntjs.com/) (and thus [node.js](http://nodejs.org/) for [npm](https://www.npmjs.org/))


## Modifying the bookmarklets

On the folders `src/galFly/` and `src/galNum/` you'll find the originals, with mock data, you can use to modify the bookmarklet in any way you like.

Make sure not to modify the `<!-- replace with: -->` comments since they are used for the minification and concatenation process.


## Generating minified version

First we have to download the needed packages, on project root run

```
npm install
```

Then run `./make.rb` on the console so `dist/galNum.js` and `dist/galFly.js` are generated.

Paste the code of these files to [js-inject](http://mcdlr.com/js-inject/) to get a link you can easily drag to your bookmarks bar.
