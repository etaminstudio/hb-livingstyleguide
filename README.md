# Living Style Guide

## Getting started

Install [Harp](http://harpjs.com):

    npm install -g harp

And Browserify

    npm install -g browserify watchify

And browser-sync (*)

    npm install -g browser-sync

(*) You may not need browser-sync, it can be a bit complicated to [install on Windows](http://www.browsersync.io/docs/#windows-users) and is only needed if you want your pages to auto-reload on code changes.

And the project dependencies (run this command from the project folder)

    npm install


## Development mode

    npm start

This launches a local server at http://localhost:9000
The server is proxied on http://localhost:3000 by browser-sync with the auto-reload on code changes.


## Compile a static version

    npm run compile


## Build the styleguide

    npm run build

This task will:
* compile all SCSS files into a single `./build/assets/css/styleguide.css`
* compile all JS files into a single `./build/assets/javascript/styleguide.js`
* copy `./src/javascript/config.js` to `./build/assets/javascript/config.js` without modification
* copy `./src/javascript/locales.js` to `./build/assets/javascript/locales.js` without modification
* copy all webfont files to `./build/assets/fonts/`
* optimize and copy all images (png, jpg, svg, gif) to `./build/assets/images/` while preserving the original tree structure
* copy all jade and json files to `./build/jade/` while preserving the original tree structure
* copy `./src/layouts/_wrapper.jade` to `./build/jade/layouts/wrapper.jade` without modification

### Use the build in another project

Run `npm link` in this folder

Run `npm link my-styleguide` in the other project

You'll get the my-styleguide project symbolically linked in the other project `node_modules`.

If it's an Express project you can do something like:

    app.set('views', [app.get('views'), path.join(__dirname, 'node_modules', 'my-styleguide', 'build', 'jade') ]);

to be able to render Jade templates coming from the styleguide. \o/
