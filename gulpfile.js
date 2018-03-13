var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var usemin = require('gulp-usemin');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var rev = require('gulp-rev');
var ngannotate = require('gulp-ng-annotate');
var del = require('del');
// Set the banner content
var banner = ['/*!\n',
  ' * João Tavares Webpage - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/tauvares/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);
});

gulp.task('browser-sync', ['default'], function() {
  var files = [
    'app/**//*.html',
    'app/styles/**/*.scss',
    'app/styles/**/*.css',
    'app/img/**/*.png',
    'app/scripts/**/*.js',
    'dist/**/*'

  ];
  browserSync.init(files, {
    port: 5000,
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });

  gulp.watch('app/styles/scss/*.scss', ['sass']);
  gulp.watch('app/styles/css/*.css', ['minify-css']);
  gulp.watch('app/scripts/frontend/*.js', ['minify-js']);
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('prepara', 'usemin', 'imagemin', 'copyfonts');
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('usemin', [], function() {
  return gulp.src('./app/**/*.html')
    .pipe(usemin({
      css: [minifycss(), rev()],
      js: [ngannotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Imagens
gulp.task('imagemin', function() {
  return del(['dist/img']), gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./node_modules/font-awesome/fonts/**.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./node_modules/bootstrap/dist/fonts/**.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('cleanapi', function() {
  return del(['../jtdev/client'], {
    force: true
  });
});

gulp.task('copyapi', ['cleanapi'], function() {
  return gulp.src('dist/**')
    .pipe(gulp.dest('../jtdev/client'));
});

// JTDEV - Prepara
gulp.task('prepara', ['sass', 'minify-css', 'minify-js']);

// JTDEV - Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('app/styles/scss/jtdev.scss')
    .pipe(sass())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('app/styles/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// JTDEV - Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('app/styles/css/jtdev.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/styles/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// JTDEV - Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('app/scripts/frontend/jtdev.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/scripts/frontend'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// JTDEV - Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});
