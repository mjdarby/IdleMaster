# angular-darberplate — an instantly Heroku-deployable angular-seed with bootstrap

Just read the [angular-seed][angular-seed] docs for the real deets. I just took out some of the cruft (second view and demo components) and put jQuery and bootstrap in there too because I'm awesome.

Finally, it also works with Heroku immediately!

## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  home/                  --> the home view template and logic
    home.html            --> the partial template
    home.js              --> the controller logic
    home_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

[angular-seed]: https://github.com/angular/angular-seed
