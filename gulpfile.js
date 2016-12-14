/**
* Gulpfile
*
* WP Development Accelerator
*
* Includes:
*   1. Autoreload with BrowserSync.
*   2. Bower: automoving bower components files to Vendors Styles
*      and Vendors JS folders.
*   3. CSS: sass to css converter, error tracking, autoprefix,
*      sourcemaps, minification and @media merging.
*   4. JS: concatenation and minification Vendor and Custom JS.
*   5. Images: minification PNG, JPEG, GIF and SVG.
*   6. Watching for changes to CSS, JS, PHP, Bower components
*      and autolaunching tasks.
*   7. Line ending correction.
*   8. Print notifications after task complete.
*
* @author frontsider (@frontsider)
* @version 1.0.0
*
*/

/**
* =============================================================================
*  Project Variables
* =============================================================================
*/

// Project
var projectURL              = 'localhost:8888'; // project URL. Example: localhost:8888

// JS Concatination Order Settings
var jsVendorOrder           = ['**.js']; // order of Vendor JS files on compiled file
var jsCustomOrder           = ['**.js']; // order of Custom JS files on compiled file

// Notifications Settings
var notificationOn         = true; // notifications on/off (true/false)

// Styles
var styleMainFile           = './assets/css/style.scss'; // .scss main file
var styleVendorsSRC         = './assets/css/vendors/'; // Vendors Styles folder
var styleDestination        = './'; // path to compiled .css file

// JS Vendors
var jsVendorsSRC            = './assets/js/vendors/'; // Vendors JS folder
var jsVendorsFiles          = './assets/js/vendors/*.js'; // path to all Vendors JS files
var jsVendorDestination     = './assets/js/'; // path to compiled Vendor JS file
var jsVendorFile            = 'vendors'; // name of Vendor JS file

// JS Customs
var jsCustomsFiles            = './assets/js/custom/*.js'; // path to all Customs JS files
var jsCustomDestination     = './assets/js/'; // path to compiled Vendor JS file
var jsCustomFile            = 'custom'; // name of Custom JS file

// Images
var imagesSRC               = './assets/img/raw/**/*.{png,jpg,gif,svg}'; // all images
var imagesDestination       = './assets/img/'; // path to minificated images

// Wathers Settings
var bowerWatchFiles         = './assets/bower/**'; // all Bower components
var styleWatchFiles         = './assets/css/**/*.scss'; // all .scss files
var vendorJSWatchFiles      = './assets/js/vendor/*.js'; // all Vendors JS files
var customJSWatchFiles      = './assets/js/custom/*.js'; // all Customs JS files
var projectPHPWatchFiles    = './**/*.php'; // all .php files

// Autoprefixer settings (see more: https://github.com/ai/browserslist)
const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];


/**
* =============================================================================
*  Gulp Plagins
* =============================================================================
*/

// Gulp
var gulp         = require( 'gulp' );

// CSS Plagins
var sass          = require( 'gulp-sass' ); // sass compilator
var minifycss     = require( 'gulp-uglifycss' ); // css minificator
var autoprefixer  = require( 'gulp-autoprefixer' ); // autoprefixer
var mmq           = require( 'gulp-merge-media-queries' ); // @media merger

// JS Plagins
var concat        = require( 'gulp-concat' ); // js concatenator
var uglify        = require( 'gulp-uglify' ); // js minificator

// Image Plagins
var imagemin      = require( 'gulp-imagemin' ); // png, jpeg, gif, svg minificator

// Bower Plagins
var mbf           = require( 'main-bower-files' ); // collect main files of Bower components

// Utilities
var order         = require( 'gulp-order' ); // order of files
var rename        = require( 'gulp-rename' ); // rename files
var lineec        = require( 'gulp-line-ending-corrector' ); // line ending correction
var filter        = require( 'gulp-filter' ); // filter for gulp
var sourcemaps    = require( 'gulp-sourcemaps' ); // sourcemaps creator
var notify        = require( 'gulp-notify' ); // print notification messages
var gulpIf        = require( 'gulp-if' ); // conditions for gulp

// BrowserSync
var browserSync   = require( 'browser-sync' ).create(); // auto page reload
var reload        = browserSync.reload;


/**
* =============================================================================
*  Gulp Tasks
* =============================================================================
*/

/**
* -----------------------------------------------------------------------------
*  Task: BrowserSync
* -----------------------------------------------------------------------------
*
* Auto page reload and project sharing
*
*/

gulp.task( 'browser-sync', function() {
  browserSync.init( {

    // see more: http://www.browsersync.io/docs/options/

    // project URL
    proxy: projectURL,

    // port setting
    // port: 8080,

    // Browsersync tunnel for project sharing
    // tunnel: true,

    // URL type: local, external, ui, tunnel или false
    open: true,

    // css injecting
    injectChanges: true,

    // browsers for launching
    // browser: ['google chrome', 'firefox']

  } );
});


/**
* -----------------------------------------------------------------------------
*  Task: Bower components
* -----------------------------------------------------------------------------
*
* Move Bower components main files (.js, .css, .scss) to vendors folders
*
*/

gulp.task( 'bower', function () {
  var bowerArr = mbf({
    paths: {
      bowerDirectory: './assets/bower', // Bower components folder
      bowerrc: './.bowerrc', // path to .bowerrc
      bowerJson: './bower.json', // path to bower.json
      checkExistence: true
    }
  });

  if ( !bowerArr.length ) {
      // No main files found. Skipping....
      return;
  }

  const jsFilter = filter( '**/*.js', { restore: true } );
  const cssFilter = filter( '**/*.css', { restore: true } );
  const scssFilter = filter( '**/*.scss', { restore: true } );

  gulp.src( bowerArr )
    .pipe( jsFilter ) // .js filter
    .pipe( gulp.dest( jsVendorsSRC ) )
    .pipe( jsFilter.restore ) // filter reset

    .pipe( cssFilter ) // .css filter
    .pipe( rename( { prefix: '_' } ) ) // add prefix "_"
    .pipe( gulp.dest( styleVendorsSRC ) )
    .pipe( cssFilter.restore )

    .pipe( scssFilter ) // .scss filter
    .pipe( gulp.dest( styleVendorsSRC ) )
    .pipe( scssFilter.restore )

    .pipe( gulpIf( notificationOn,
      notify( { message: 'Task "bower" completed! 👍', onLast: true } ) )
    );
});


/**
* -----------------------------------------------------------------------------
*  Task: Styles
* -----------------------------------------------------------------------------
*
* Compilation of sass, autoprefixes and css minification
*
*/

gulp.task( 'styles', function () {
  gulp.src( styleMainFile )
    .pipe( sourcemaps.init() )
      .pipe( sass( {
        errLogToConsole: true,
        // outputStyle: 'compact',
        // outputStyle: 'compressed',
        // outputStyle: 'nested',
        outputStyle: 'expanded',
        precision: 10 // precision (number of figures after dot)
      } ) )
      .on( 'error', console.error.bind( console ) ) // print compilation error without gulp crushing
    .pipe( sourcemaps.write( { includeContent: false } ) )

    .pipe( sourcemaps.init( { loadMaps: true } ) )
      .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
    .pipe( sourcemaps.write( styleDestination ) )

    .pipe( lineec() )
    .pipe( gulp.dest( styleDestination ) )

    .pipe( filter( '**/*.css' ) )
    .pipe( mmq( { log: true } ) ) // @media merging

    .pipe( browserSync.stream() ) // css injection

    .pipe( rename( { suffix: '.min' } ) )
    .pipe( minifycss( {
      maxLineLen: 10
    }))
    .pipe( lineec() )
    .pipe( gulp.dest( styleDestination ) )

    .pipe( browserSync.stream() ) // css injection

    .pipe( gulpIf( notificationOn,
      notify( { message: 'Task "styles" completed! 👍', onLast: true } ) )
    );
});


/**
* -----------------------------------------------------------------------------
*  Task: Vendors JS
* -----------------------------------------------------------------------------
*
* Vendors JS concatenation and minification
*
*/

gulp.task( 'vendorsJS', function() {
  gulp.src( jsVendorsFiles )
    .pipe( order( jsVendorOrder ) ) // order of files
    .pipe( concat( jsVendorFile + '.js' ) )
    .pipe( lineec() )
    .pipe( gulp.dest( jsVendorDestination ) )

    .pipe( rename( { suffix: '.min' }))
    .pipe( uglify() )
    .pipe( lineec() )
    .pipe( gulp.dest( jsVendorDestination ) )

    .pipe( gulpIf( notificationOn,
      notify( { message: 'Task: "vendorsJS" completed! 👍', onLast: true } ) )
    );
});


/**
* -----------------------------------------------------------------------------
* Task: Customs JS
* -----------------------------------------------------------------------------
*
* Customs JS concatenation and minification
*
*/

gulp.task( 'customsJS', function() {
  gulp.src( jsCustomsFiles )
    .pipe( order( jsCustomOrder ) ) // order of files
    .pipe( concat( jsCustomFile + '.js' ) )
    .pipe( lineec() )
    .pipe( gulp.dest( jsCustomDestination ) )

    .pipe( rename( { suffix: '.min' }))
    .pipe( uglify() )
    .pipe( lineec() )
    .pipe( gulp.dest( jsCustomDestination ) )

    .pipe( gulpIf( notificationOn,
      notify( { message: 'Task: "customsJS" completed! 👍', onLast: true } ) )
    );
});


/**
* -----------------------------------------------------------------------------
*  Task: Images
* -----------------------------------------------------------------------------
*
* Minification of PNG, JPEG, GIF и SVG
*
* The task is launched once, because it has no watcher (use `gulp images`)
*
*/

gulp.task( 'images', function() {
  gulp.src( imagesSRC )
    .pipe( imagemin( {
        progressive: true,
        interlaced: true,
        optimizationLevel: 3, // quality 0-7 (low - high)
        svgoPlugins: [{removeViewBox: false}]
      } ) )
    .pipe(gulp.dest( imagesDestination ))

    .pipe( gulpIf( notificationOn,
      notify( { message: 'Task: "images" completed! 👍', onLast: true } ) )
    );
});


/**
* -----------------------------------------------------------------------------
*  Default Task
* -----------------------------------------------------------------------------
*
* Launching tasks and watchers
*
*/

gulp.task( 'default', ['images', 'bower', 'styles', 'vendorsJS', 'customsJS', 'browser-sync'], function () {
  gulp.watch( bowerWatchFiles, ['bower'] ); // watch for Bower components
  gulp.watch( projectPHPWatchFiles, reload ); // watch for .php
  gulp.watch( styleWatchFiles, ['styles'] ); // watch for styles
  gulp.watch( jsVendorsFiles, ['vendorsJS', reload] ); // watch for Vendors JS
  gulp.watch( jsCustomsFiles, ['customsJS', reload] ); // watch for Customs JS
});
