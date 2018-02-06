var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat');


// Process CSS

gulp.task('sass', function() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //.pipe(autoprefixer('last 2 version'))
        .pipe(postcss([ autoprefixer()]))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/site/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass']);
