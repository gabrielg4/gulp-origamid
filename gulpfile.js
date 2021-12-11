// Adiciona os modulos instalados 

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// Funçao para compilar o SASS e a dicionar os prefixos
function compilaSass() {
    return gulp.src('scss/*.scss').pipe(sass({
        outputStyle: 'compressed'})).pipe(autoprefixer({
        cascade: false
    })).pipe(gulp.dest('css/')).pipe(browserSync.stream());
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', compilaSass);


// função para juntar o js
function gulpJS() {
    return gulp.src('js/main/*.js').pipe(babel({presets: ['env']})).pipe(uglify()).pipe(concat('main.js')).pipe(gulp.dest('js/'));
}

gulp.task('mainjs', gulpJS);

// Funcao para iniciar o browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
}

// tarefa para iniciar o browser-sync

gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch(['js/main/*.js', '!js/main.js'], gulpJS);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));