# angular-eha.date-of-birth-or-age

[![Build Status](https://travis-ci.org/eHealthAfrica/angular-eha.date-of-birth-or-age.svg)](https://travis-ci.org/eHealthAfricaangular-eha.date-of-birth-or-age) ![Dependecy Status](https://david-dm.org/eHealthAfrica/angular-eha.date-of-birth-or-age.svg) ![Dev Dependecy Status](https://david-dm.org/eHealthAfrica/angular-eha.date-of-birth-or-age/dev-status.svg)

> Date of birth & Age features

[Demo][].

[demo]: http://docs.ehealthafrica.org/angular-eha.date-of-birth-or-age/

## Usage

## Installation

Install with npm:

    npm install --save angular-eha.date-of-birth-or-age

Or alternatively bower:

    bower install --save angular-eha.date-of-birth-or-age

### Distribution bundle

- *dist/date-of-birth-or-age.js*
- *dist/date-of-birth-or-age.min.js*
- *dist/date-of-birth-or-age.templates.js* *(default)*
- *dist/date-of-birth-or-age.templates.min.js*

Then simply add `eha.date-of-birth-or-age` as dependencies somewhere in your project that makes sense and you're good to go.

#### A note on wiredep

If you're using wiredep `dist/date-of-birth-or-age.template.js` will be injected by default. If you don't want that to happen you'll like want to employ something along the following lines in your `Gruntfile`:

```javascript
wiredep: {
 ...
  options: {
    exclude: [
      'bower_components/date-of-birth-or-age/dist/date-of-birth-or-age.template.js'
    ]
  }
  ...
}
```

Then you're free to include whichever bundle you prefer in what ever manner you prefer.

### Example

```html
<html ng-app="dobExample">
  <head>
    <title>Back Button Example</title>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-eha.date-of-birth-or-age/dist/date-of-birth-or-age.template.js"></script>
    <script>
      var app = angular.module('dobExample', [
        'eha.date-of-birth-or-age'
      ]);

      app.controller('MyCtrl', function($scope) {
        $scope.person = {
          birthYear: '',
          birthMonth: '',
          birthDay: '',
          age: {
            years: '',
            months: ''
          }
        }
      });
    </script>
  </head>
  <body>
    <div ng-controller="MyCtrl">
      <eha-date-of-birth-or-age model="person"></eha-date-of-birth-or-age>
    </div>
  </body>
</html>
```

## Contributing

### Prerequisites

- Firefox (for running test suite)
- node (0.12.0)
- bower (1.3.12)
- grunt-cli (0.1.7)
- grunt (0.4.5)


### Installation

```bash
# Fork the upstream repo on github and pull down your fork
git clone git@github.com:yourusername/angular-eha.date-of-birth-or-age.git
# change into project folder
cd angular-eha.date-of-birth-or-age
# Add the upstream as a remote
git remote add upstream  git@github.com:eHealthAfrica/angular-eha.date-of-birth-or-age.git
# Install the dev dependencies
npm install
```

### Docs

Code should be documented following the guidelines set out by [jsdoc](http://usejsdoc.org/) and [ngdoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation). We can then leverage [Dgeni](http://github.com/angular/dgeni) or something simlary to generate documentation in any format we like.

### Test Suite

The test suite is configured to run in Firefox and is powered by:

- Karma
- Mocha
- Chai (as promised)
- Sinon (chai)

The library is conducive to TDD.  `grunt test:watch` is your friend. As modules (and templates) are exposed on their own namespace you can easily isolate areas of the code base for true unit testing without being forced to pull in the whole library or stub/mock modules irrelevant to the feature(s) you're testing.

#### Running Tests

##### Single run

```bash
grunt test
```

##### Watch

```bash
grunt test:watch
```

### Transpiling templates (html2js)

Transpiling our html templates into js allows us to neatly push them into the `$templateCache`.

To transpile the templates it's another simple grunt command:

```bash
grunt templates
```

This will compile the templates to the `dist/` folder. But it's probably best to avoid this all together. Both the `grunt test` and `grunt release` commands take care of all of this for you.

If you need to override the default template, simply replace what's already in the `$templateCache` with what ever you want. One way to achieve this is like this:

```html
<script id="templates/date-of-birth-or-age.directive.tpl.html" type="text/html">
  // Your markup here
</script>
```

## License

Copyright 2015 Matt Richards <matt.richards@ehealthafrica.org>

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.
