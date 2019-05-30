var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefix = require('gulp-autoprefixer');

// 合并之后压缩js代码
gulp.task('uglify', function(){
    return gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/js'));
});

// 编译less
gulp.task('less', function(){
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(autoprefix())
        .pipe(gulp.dest('src/css'));
});

// 压缩css
gulp.task('minifyCss', ['less'], function(){
    return gulp.src('src/css/*.css')
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

// 压缩html
gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('server',function(){
    connect.server({
        root:'dist',//服务器的根目录
        port: 8081, //服务器的地址，没有此配置项默认也是 8080
        livereload: true//启用实时刷新的功能
    });
});

gulp.task('reload', function(){
    return gulp.src('src/**/*.html', )
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch('src/css/*.css', ['minifyCss','reload']);
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/js/*.js', ['uglify', 'reload']);
    gulp.watch('src/*.html', ['html', 'reload']);
});

gulp.task('default',['server', 'watch'], function(){
    gulp.src('src/assets/*.*')
        .pipe(gulp.dest('dist/assets'));
});
