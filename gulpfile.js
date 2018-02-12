// Resource libs
var gulp         = require('gulp'),                  // https://www.npmjs.com/package/gulp
    browserSync  = require('browser-sync').create(), // https://www.npmjs.com/package/browser-sync
    sass         = require('gulp-sass'),             // https://www.npmjs.com/package/gulp-sass
    autoprefixer = require('autoprefixer'),          // https://www.npmjs.com/package/autoprefixer
    sourcemaps   = require('gulp-sourcemaps'),       // https://www.npmjs.com/package/gulp-sourcemaps
    postcss      = require('gulp-postcss'),          // https://www.npmjs.com/package/gulp-postcss
    uglify       = require('gulp-uglify'),           // https://www.npmjs.com/package/gulp-uglify
    imagemin     = require('gulp-imagemin'),         // https://www.npmjs.com/package/gulp-imagemin
    htmlmin      = require('gulp-html-minifier'),    // https://www.npmjs.com/package/gulp-html-minifier
    concat       = require('gulp-concat');           // https://www.npmjs.com/package/gulp-concat

// All paths names, Change according to your needs   
var paths = {
  publishRoot : 'dist', 
  imgDir      : 'img',
  cssDir      : 'css',
  jsDir       : 'js'
}

// Copy .html templates
gulp.task('template', function() {
    return gulp.src(['src/**/*.html'])
        //.pipe(htmlmin({collapseWhitespace: true, removeComments: true})) // minify html
        .pipe(gulp.dest(paths.publishRoot))        
        .pipe(browserSync.stream()); // browser-sync
});

// Copy assets
gulp.task('asset', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin()) // compress images
        .pipe(gulp.dest(paths.publishRoot+'/img'))
        .pipe(browserSync.stream());
});

// Process CSS
gulp.task('sass', function() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([ autoprefixer()]))
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.publishRoot + "/" + paths.cssDir))
        .pipe(browserSync.stream());
});

// Process JS files
gulp.task('js', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'src/js/**/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.publishRoot + '/js'))
    .pipe(browserSync.stream());
});

// Serve and monitor
gulp.task('watch', ['sass', 'js'], function() {

    browserSync.init({
        server: './'+paths.publishRoot
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/*.html', ['template']);
    gulp.watch('src/img/*', ['asset'])
    //gulp.watch(paths.publishRoot+'/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'asset', 'template', 'watch']);
