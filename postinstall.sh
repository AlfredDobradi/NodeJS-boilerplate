#!/bin/bash
if [ -f bower.json ]
then
echo "Installing bower dependencies"
bower install
else
echo "bower.json not found, skipping bower install"
fi

if [ -f Gruntfile.js -a -f node_modules/grunt-cli/bin/grunt ]
then
echo "Running grunt default tasks"
./node_modules/grunt-cli/bin/grunt
else
echo "Gruntfile (./Gruntfile.js) or Grunt executable (./node_modules/grunt-cli/bin/grunt) not found. Skipping grunt task."
fi