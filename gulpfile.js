var gulp = require('gulp'),
    less = require('gulp-less'),
    glob = require("glob"),
    browserSync = require('browser-sync'),
    autoprefixer = require("gulp-autoprefixer"),
    typescript = require("gulp-typescript");



gulp.task('less', function(){
    return gulp.src('src/style/base.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                "last 2 versions",
                "safari 5",
                "ie 10",
                "ie 11"
            ],
            cascade: true
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        startPath: "./mail.html",
        port: 9191,
        files: [
            "./*.html"
        ]
    });
});

gulp.task("typescript", () => {
    return gulp.src("src/components/**/*.ts")
        .pipe(typescript())
        .pipe(gulp.dest("public/js/components"));
});

gulp.task('watch', ['browser-sync', 'less'], function() {
    gulp.watch('src/style/**/*.less', ['less']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});








