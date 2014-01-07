component-template
==================

default template for grunt init

To use it:

```
 npm install -g grunt-init
 cd appmaker
 git clone https://github.com/mozilla-appmaker/component-template.git 
 mkdir component-my-new-thing
 cd component-my-new-thing
 grunt-init ../component-template
 #follow directions
```

and when you're ready to commit to github, go to Github and:

- [ ] create a repo 
- [ ] make a gh-pages branch
- [ ] make the gh-pages branch be the default
- [ ] remove the master branch

and then commit your code to the gh-pages branch:

```
 git add .
 git commit -m "first commit"
 git push origin 
```
