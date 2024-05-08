const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', () => {
    return gulp.src('src/assets/style/index.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('maps', {
            addComment: true
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('watch', () => {
    gulp.watch('src/assets/style/setup/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});