# iron

| Tool      | Badge                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| Travis CI | [![Build Status](https://travis-ci.com/benjspriggs/iron.svg?branch=master)](https://travis-ci.com/benjspriggs/iron) |
| Heroku    | [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)                                 |

## What is it?

A dead simple plaintext-oriented blog tool. Designed to be used at the command line, revolving around your favorite version control system of choice.

`iron` is a server that can point at a git repo (or host its own) that hosts pretty versions of what's already there, similar to Github Pages.

The power of `iron` is that it takes a super simple blog format instead of jekyll's more explicit style:

```md
---
title: Posts are titled like this
tags: Have tags like this
---

And have content like this
```

versus:

```
// Posts are titled like this
And have content like this

#have tags like this #and this
```

### Similar apps

- Medium
- Github Pages
- Svtble
- Ghost
- Jekyll
- Dropplets
- ...

## How do I get started?

If you want to see how it looks, click the 'Deploy to Heroku' button and Heroku will take care of the rest.

For getting started locally:

1.  download/install [node.js](http://nodejs.org/)
1.  install dependencies: `npm install`
1.  run it: `npm start`
1.  open http://localhost:3000 in a browser

## Credits

`iron` was written primarily by Benjamin Spriggs (@benjspriggs on Github). [Contact](mailto:ben@sprico.com).
