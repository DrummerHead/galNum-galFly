#!/usr/bin/env ruby

# Executes grunt, by default this compresses stijl.css and gedrag.js
grunt = %x[grunt]
puts grunt

def compact_gal(which)
  css_min = File.read("temp/#{which}/stijl.min.css")
  js_min = File.read("temp/#{which}/gedrag.min.js")
  html = File.read("src/#{which}/index.html")
  bookmarklet = File.read("src/#{which}/#{which}.js")

  # Oh the trouble and madness I've been through
  # http://stackoverflow.com/questions/13458410/
  js_min.gsub!(/\\/m){ %q(\\\\) }
  js_min.gsub!(/'/m){ %q(\') }

  html.gsub!(/<!-- replace with:(.*?)-->.*?<!-- end replace -->/m){ $1 }
  File.write("temp/#{which}/index_for_minification.html", html)
  grunt = %x[grunt htmlmin]

  html_min = File.read("temp/#{which}/index.min.html")
  html_min.gsub!('{{css}}'){ css_min }
  html_min.gsub!('{{js}}'){ js_min }
  bookmarklet.gsub!('{{html}}'){ html_min }
  File.write("dist/#{which}.js", bookmarklet)

  puts "= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ="
  puts "Bookmarklet #{which} has been generated at: dist/#{which}.js"
  puts "paste that code at mcdlr.com/js-inject/ to generate final bookmarklet"
end

compact_gal("galFly")
