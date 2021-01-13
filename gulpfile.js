let projectFolder = "dist";
let sourceFolder = "src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        lib: projectFolder + "/lib/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/"
    },
    src: {
        html: sourceFolder + "/index.html",
        scss: sourceFolder + "/scss/style.sass",
        lib: sourceFolder + "/scss/*.css",
        js: sourceFolder + "/js/*.js",
        img: sourceFolder + "/img/*.{jpg,svg,png,ico,gif,webp}",
        fonts: sourceFolder + "/fonts/*.ttf",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        scss: sourceFolder + "/scss/**/*.sass",
        lib: sourceFolder + "/scss/*.css",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/*.{jpg,svg,png,ico,gif,webp}",
        fonts: sourceFolder + "/fonts/*.ttf",
    },
    clean: "./" + projectFolder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    del = require('del'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin');


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/",
        },
        port: 3000,
        notify: false,
    })
}

function html() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream());
}

function scss() {
    return gulp.src(path.src.scss)
    .pipe(
        sass({
            outputStyle: 'expanded'
        })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream());
}

function lib() {
    return gulp.src(path.src.lib)
    .pipe(gulp.dest(path.build.lib))
    .pipe(browsersync.stream());
}

function js() {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return gulp.src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interPlaces: true, 
                optimizationLevel: 3
            })
        )
        .pipe(gulp.dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browsersync.stream());
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], scss);
    gulp.watch([path.watch.lib], lib);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.fonts], fonts);
}

function clean(params) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(lib, scss, html, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.images = images;
exports.js = js;
exports.lib = lib;
exports.scss = scss;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;