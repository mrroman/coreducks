const gulp = require('gulp'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      mocha = require('gulp-mocha'),
      del = require('del');

gulp.task('clean:dist', (cb) => {
    return del(['dist']);
});

gulp.task('clean:test', () => {
    return del(['test-build']);
});

gulp.task('build:src', ['clean:dist'], () => {
    return gulp.src(['src/modules/*.js', 'src/microducks.js'])
        .pipe(concat('microducks.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:test', ['clean:test'], () => {
    return gulp.src('test/*.js')
        .pipe(babel())
        .pipe(gulp.dest('test-build'));
});

gulp.task('test', ['build:src', 'build:test'], () => {
    return gulp.src('test-build/*.js')
        .pipe(mocha({reporter:'spec'}))
        .on('error', (e) => {
            console.log('[mocha]', e.message);
            gulp.emit('end');
        });
});

gulp.task('dev', ['build:src', 'build:test', 'test'], () => {
    gulp.watch('src/*.js', ['build', 'test']);
    gulp.watch('test/*.js', ['test']);
});
