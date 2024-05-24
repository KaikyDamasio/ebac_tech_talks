const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function comprimeImagens(){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}





function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}



function funçãoPadrao(callback){
    setTimeout(function(){
        console.log("Executando via gulp");
        callback();
    },8000)

}

function dizOi(callback){
    setTimeout(function(){
        console.log("Olá gulp");
        dizTchau();
        callback();
    },1000)
}

function dizTchau(){
    console.log("Tchau Gulp");

}

exports.default = gulp.parallel(funçãoPadrao, dizOi);
exports.dizOi = dizOi;
exports.sass = compilaSass;
exports.javascript = comprimeJavaScript;
exports.images = comprimeImagens;
