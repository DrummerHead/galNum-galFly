#!/usr/bin/env ruby

# Executes gulp, by default this compresses main.css and main.js
puts %x[gulp]

def compact_gal(which)
  css_min = File.read("temp/#{which}/main.css")
  js_min = File.read("temp/#{which}/main.js")
  html = File.read("src/#{which}/index.html")
  bookmarklet = File.read("src/#{which}/bookmarklet.js")

  # Oh the trouble and madness I've been through
  # http://stackoverflow.com/questions/13458410/
  js_min.gsub!(/\\/m){ %q(\\\\) }
  js_min.gsub!(/'/m){ %q(\') }

  html.gsub!(/<!-- replace with:(.*?)-->.*?<!-- end replace -->/m){ $1 }
  File.write("temp/#{which}/index_for_minification.html", html)
  puts %x[gulp htmlmin]

  html_min = File.read("temp/#{which}/index.min.html")
  html_min.gsub!('{{css}}'){ css_min }
  html_min.gsub!('{{js}}'){ js_min }
  bookmarklet.gsub!('{{html}}'){ html_min }
  File.write("dist/#{which}.js", bookmarklet)
  puts %x[gulp uglify:dist]

  puts "\n= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ="
  puts "  Bookmarklet #{which} has been generated"
  puts "  - Use dist/#{which}.min.js for http://mcdlr.com/js-inject/"
  puts "  - Use dist/#{which}.min.html.js for index.html"
  puts "= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\n\n"
end

compact_gal("galFly")
compact_gal("galNum")
