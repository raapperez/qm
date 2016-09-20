'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const watch = require('gulp-watch');
const env = process.env.NODE_ENV || 'development';

console.log(`Running gulp in ${env}`);

function jsTask() {
    return gulp.src('./frontend/src/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('frontend/js'));
}

gulp.task('js', jsTask);
gulp.task('js-watch', () => {
    return watch('./frontend/src/js/**/*.js', { ignoreInitial: false }, jsTask);
});

function lessTask() {
    return gulp.src(['./frontend/src/less/*-main.less'])
        .pipe(less())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./public/css'));
}

gulp.task('less', lessTask);
gulp.task('less-watch', () => {
    return watch('./frontend/src/less/**/*.less', { ignoreInitial: false }, lessTask);
});

gulp.task('default', ['js', 'less']);
gulp.task('watch', ['js-watch', 'less-watch']);