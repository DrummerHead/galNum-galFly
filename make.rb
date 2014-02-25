#!/usr/bin/env ruby

# Executes grunt, by default this compresses main.css and main.js
grunt = %x[grunt]
puts grunt

def compact_gal(which)
  css_min = File.read("temp/#{which}/main.min.css")
  js_min = File.read("temp/#{which}/main.min.js")
  html = File.read("src/#{which}/index.html")
  bookmarklet = File.read("src/#{which}/bookmarklet.js")

  # Oh the trouble and madness I've been through
  # http://stackoverflow.com/questions/13458410/
  js_min.gsub!(/\\/m){ %q(\\\\) }
  js_min.gsub!(/'/m){ %q(\') }

  html.gsub!(/<!-- replace with:(.*?)-->.*?<!-- end replace -->/m){ $1 }
  File.write("temp/#{which}/index_for_minification.html", html)
  grunt = %x[grunt htmlmin]
  puts grunt

  html_min = File.read("temp/#{which}/index.min.html")
  html_min.gsub!('{{css}}'){ css_min }
  html_min.gsub!('{{js}}'){ js_min }
  bookmarklet.gsub!('{{html}}'){ html_min }
  File.write("dist/#{which}.js", bookmarklet)

  puts "\n= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ="
  puts "Bookmarklet #{which} has been generated at: dist/#{which}.js"
  puts "paste that code at mcdlr.com/js-inject/ to generate final bookmarklet"
  puts "= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\n\n"
end

compact_gal("galFly")
compact_gal("galNum")
