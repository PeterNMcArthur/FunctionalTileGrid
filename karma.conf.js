// Karma configuration
// Generated on Mon Aug 17 2015 21:20:32 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
    console.log('test');
  config.set({

    frameworks: ['browserify', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/spec/**/*Spec.js',
      'test/spec/*Spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
         'test/**/*Spec.js': ['browserify']
    },
    reporters: ['dots', 'spec', 'failed'],

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

      logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


   browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
