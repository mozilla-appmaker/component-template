Making a new Appmaker component from scratch
==================

With this repo, you should be able to quickly get the designer tool at appmaker.mozillalabs.com/designer to load your custom component.

To use it:

```
 # install node if you don't already have it
 # install npm if the node installation didn't do it already
 npm install -g grunt-init
 git clone https://github.com/mozilla-appmaker/component-template.git 
 mkdir my-new-thing
 cd my-new-thing
 grunt-init ../component-template
 npm install
 #follow directions
 grunt serve
 # this will start a local server at http://localhost:9001
 # go into appmaker, sign in, add a component giving the URL: 
 #       http://localhost:9001/component.html
```
