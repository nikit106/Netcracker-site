var gulp = require('gulp'),
    less = require('gulp-less'),
    glob = require("glob"),
    browserSync = require('browser-sync'),
    autoprefixer = require("gulp-autoprefixer"),
    typescript = require("gulp-typescript"),
    svgstore = require("gulp-svgstore"),
    cleanCSS = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    svgmin = require("gulp-svgmin"),
    imagemin    = require('gulp-imagemin'),
    cache       = require('gulp-cache'),
    pngquant    = require('imagemin-pngquant'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del');

gulp.task('less', function(){
    return gulp.src('src/less/base.less')
        .pipe(sourcemaps.init())
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
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("mail", () => {
    return gulp.src("src/mail.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("yandex", () => {
    return gulp.src("src/yandex.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("css", () => {
    return gulp.src("src/css/base.css")
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({stream: true}));
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

gulp.task('svgstore', () => {
    let svgs=gulp.src("src/icons/*.svg")
        .pipe(svgmin((file) => {
            let prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + "-",
                        minify: true
                    }
                }]
            };
        }))
        .pipe(rename({prefix: "icon-"}))
        .pipe(svgstore({inlineSvg: true}))

    function fileContents (filePath, file) {
        return file.contents.toString();
    }
    return gulp
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('img', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['yandex','css', 'browser-sync', 'img', 'less'], function() {
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);

gulp.task('build', ['clean', 'img', 'less'], function() {

    var buildCss = gulp.src([
        'src/css/base.css'
    ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('clean', function() {
    return del.sync('dist');
});









