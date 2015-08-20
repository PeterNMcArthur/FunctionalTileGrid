module.exports = function(karma) {
  karma.set({

    // include browserify first in used frameworks
    frameworks: [ 'browserify', 'jasmine' ],

    // add all your files here,
    // including non-commonJS files you need to load before your test cases
    files: [
      'app/dev/**/*.js',
      'test/**/*.js'
    ],

    // add preprocessor to the files that should be
    // processed via browserify
    preprocessors: {
      'app/dev/**/*.js': [ 'browserify' ],
      'test/**/*.js': [ 'browserify' ],
    },
    browsers : ['PhantomJS'],

    // see what is going on
    logLevel: 'LOG_DEBUG',
    reporters: ['dots'],

    // use autoWatch=true for quick and easy test re-execution once files change
    autoWatch: true,

    // add additional browserify configuration properties here
    // such as transform and/or debug=true to generate source maps
    browserify: {
      debug: true,      
      transform: [ 'brfs' ]
    }
  });
};