component-template
==================

default template for grunt init

To use it:

```
 # install node if you don't already have it
 # install npm if the node installation didn't do it already
 npm install -g grunt-init
 git clone https://github.com/mozilla-appmaker/component-template.git 
 mkdir component-my-new-thing # should start with 'component-'
 cd component-my-new-thing
 grunt-init ../component-template
 #follow directions
 grunt serve-component
 # this will start a local server at http://localhost:9001
 # go into appmaker, sign in, add a component giving the URL: 
 #       http://localhost:9001/component.html
```

and when you're ready to commit to github, go to Github and:

 - create a repo
 - make a gh-pages branch
 - make the gh-pages branch be the default
 - remove the master branch

and then commit your code to the gh-pages branch:

```
 git add .
 git commit -m "first commit"
 git push origin 
```
