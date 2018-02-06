var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var paths = {
  publish: 'dist'
}

// Copy Starter template
gulp.task('template', function() {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest("dist/"))
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
        .pipe(gulp.dest(paths.publish + "/css"))
        .pipe(browserSync.stream());
});

// Process JS files
gulp.task('js', function () {
    return gulp.src([
        'node_modules/jquery/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'src/js/**/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.publish + '/js'))
    .pipe(browserSync.stream());
});

// Serve and monitor
gulp.task('watch', ['sass', 'js'], function() {

    browserSync.init({
        server: './'+paths.publish
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    //gulp.watch('src/images/*', ['imagemin']);
    gulp.watch(paths.publish+'/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['template','sass', 'js', 'watch']);
